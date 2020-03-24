//globals
//for focus cycling
window.last_focus_search_term = "";
window.focus_class_name = "api_cycle_focus";
window.is_names_list_scrolling = false;
//for searching
window.search_db = {};
//css variables
window.window_switch_point = 850;
//init
$(document).ready(function() {
  setUpLocalNavi();
});

/**
 * sets up local search functionality
 */
function setUpLocalNavi() {
  //prepare toggler
  $("<div id='navi-toggler' class='page-handler'>").text("📜").appendTo("#main");
  //to top button
  $("<div id='to-top' class='page-handler'>").text("🔺").appendTo("#main");
  createList(); //before prepareSearcher()
  prepareSearcher(); //search input
  prepareListNavigator(); //list navigator
  prepareEvents(); //initializses events
  handleWindowResize();//resize
}
//create api list and adds its elements to DOM
function createList() {
  $("<div id='api-navi'>").prependTo("#wrapper");
  //list up
  var ul = $("<ul id='names-list'>");
  $(".doc-item").each((i, item) => {
    //replacing "id-" prefix
    var name = item.id.replace("id-", "").replace(/\-/g, ".");
    var s_id = "search-id-" + Object.keys(window.search_db).length;
    var li =
      "<li id='" + s_id + "'><a href=\"#" + item.id + '">' + name + "</a></li>"; //opening
    //creating search terms
    ul.append(li); //add to element list
    //add to search db
    var search = name + " ";
    search += $(item)
      .find(".description")
      .text();
    window.search_db[item.id] = { keywords: search, search_id: s_id };
  });
  $("#api-navi").append(ul);
}
//create and adds search element to DOM
function prepareSearcher() {
  $("<div id='search'>").appendTo("#api-navi");
  $("<input id='search_bar' type='text' placeholder='narrow down'>").appendTo(
    "#search"
  );
  $("<button id='bar_clear' class='button'>➖</button>").appendTo("#search");
}
//creates and adds navigator to #main
function prepareListNavigator() {
  var container = $("<div id='list-navigator'>");
  var up = $("<button id='navi-up' class='button'>").text("🔺");
  var down = $("<button id='navi-down' class='button'>").text("🔻");
  var confirm = $("<button id='navi-confirm' class='button'>").text("✔️");
  container
    .append(up)
    .append(down)
    .append(confirm);
  $("#api-navi").append(container);
}
//events initialization
//all the events are to be declared here.
function prepareEvents() {
  //add clear function
  $("#bar_clear").click(() => {
    //empty the input
    $("#search_bar").val("");
    search(); //empty search
    //empty focus
    clearApiFocus();
    //initialize focus
    window.api_focus_last_focus_by_search = undefined;
  });
  //add search function
  $("#search_bar").keydown(e => search(e.keyCode));
  //disable default behavior
  $("#names-list>li>a").each((i, item) => {
    $(item).click(e => {
      e.preventDefault();
    });
  });
  //clicks on jquery
  $("#names-list>li").each((i, item) => {
    //disable children events
    $(item)
      .children()
      .each((i, item) => {
        $(item).css("pointer-events", "none");
      });
    //delare event on li
    $(item).click(e => {
      //update current focus
      clearApiFocus();
      window.api_focus_cycle_point = e.target.id;
      updateListFocus();
      //move to the location
      moveToListFocusedItemOnDoc();
      //exit navi on mobile/tablet
      toggleNavi();
    });
  });
  //navigate up and down
  $("#navi-up").click(e => {
    //38 = up key
    moveOntoSearchedItems(38);
    moveToListFocusedItemOnDoc();
  });
  $("#navi-down").click(e => {
    //40 = down key
    moveOntoSearchedItems(40);
    moveToListFocusedItemOnDoc();
  });
  $("#navi-confirm").click(e => {
    if($("."+window.focus_class_name).length===0)return;
    moveToListFocusedItemOnDoc();
    toggleNavi();
  });
  //toggle menu
  $("#navi-toggler").click(e => toggleNavi());
  //window resize events
  $(window).resize(handleWindowResize);
  //to top button
  $("#to-top").click(()=>{
    $("#main").stop();
    $("#main").animate({scrollTop:0},200);
  });
}
//resize handler
function handleWindowResize() {
  //api-navi names-list height
  $("#names-list").css({
    height:
      $(window).height() - $("#search").height() - $("#list-navigator").height()
  });
  //api-navi visibility
  if($(window).width()>window.window_switch_point&&$("#api-navi").css("display")==="none"){
    $("#api-navi").css({
      display:"flex",
      opacity:1
    });
  }
}
//navi toggling functionalities
function toggleNavi() {
  //toggle can be called by link when window < window.window_switch_point
  //toggle can only happen on mobile/tablet/smalls screens 
  if ($(window).width() <= window.window_switch_point) {
    if ($("#api-navi").css("display") === "none") {
      $("#api-navi").stop();
      //show
      $("#api-navi").css({
        display: "flex"
      });
      $("#api-navi").animate(
        {
          opacity: "1"
        },
        200
      );
      //adjust toggler
      $("#navi-toggler").css("left","80vw");
    } else {
      //hide
      $("#api-navi").stop();
      $("#api-navi").animate(
        {
          opacity: "0"
        },
        200,
        () => {
          $("#api-navi").css({
            display: "none"
          });
        }
      );
      //adjust toggler
      $("#navi-toggler").css("left",0);
    }
  }
}
//searches keywords
function search(keycode = undefined) {
  //format
  if (typeof keycode !== "number") keycode = undefined;
  if (!window.search_timer) {
    //delayig a bit
    window.search_timer = setTimeout(search, 100);
  } else {
    window.search_timer = undefined;
  }
  var key = $("#search_bar").val();
  //return everything to active
  //add clear function
  $("#bar_clear").click(() => {
    //empty the input
    $("#search_bar").val("");
    search(); //empty search
    //empty focus
    clearApiFocus();
    //initialize focus
    window.api_focus_last_focus_by_search = undefined;
  });
  //do search
  if (key === "") {
    $("#names-list>li").each((i, e) => {
      $(e).removeClass("search_active search_inactive");
    });
    //let focus move
    moveOntoSearchedItems(keycode);
    return; //end
  }
  for (var id in window.search_db) {
    var item = window.search_db[id];
    if (item.keywords.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      $("#" + item.search_id)
        .removeClass("search_inactive")
        .addClass("search_active");
    } else {
      $("#" + item.search_id)
        .removeClass("search_active")
        .addClass("search_inactive");
    }
  }
  //let focus move
  moveOntoSearchedItems(keycode);
}
//highlights currently focused
function moveOntoSearchedItems(key = -1) {
  //keycode:diff
  var diff_dic = {
    13: 1, //Enter
    38: -1, //up arrow
    40: 1 //down arrow
  };
  //no key on dictionnary, abort
  if (diff_dic[key] === undefined) return;
  //define diff
  var diff = diff_dic[key];
  //prepare other varaibels
  var names_list = $("#names-list>li");
  var active_list = $("#names-list>.search_active");
  var list = names_list; //initial list
  var index = 0; //initial value
  var continuous = false;
  //switch list
  if (active_list.length > 0) {
    list = active_list; //switch to active list
    if (window.api_focus_last_focus_by_search === true) {
      continuous = true;
      //if search term has been changed, then fall back to 0
      if ($("#search_bar").val() !== window.last_focus_search_term) {
        continuous = false;
      }
    }
    //otherwise keep initial index0
    window.api_focus_last_focus_by_search = true;
    //updat search term
    window.last_focus_search_term = $("#search_bar").val();
  } else {
    //names-list
    if (window.api_focus_last_focus_by_search !== undefined) {
      continuous = true;
    }
    //update flag
    window.api_focus_last_focus_by_search = false;
    //clear search term
    window.last_focus_search_term = "";
  }
  //update index
  if (continuous === true) {
    if (list.has(focus_class_name)) {
      list.each((i, item) => {
        if (item.id === window.api_focus_cycle_point) {
          index = i; //current index
          return false; //jquery each exit
        }
      });
    }
    //update index
    if (diff > 0) {
      //continuous or cycle
      index = list[index + diff] ? index + diff : 0;
    } else if (diff < 0) {
      //decrement or cycle
      index = list[index + diff] ? index + diff : list.length + diff;
    }
  } else {
    //end of the list when diff is minus
    if (diff < 0) index = list.length - 1;
  }

  //clear the last focus
  clearApiFocus();
  window.api_focus_cycle_point = list[index].id;
  updateListFocus();
  moveToListFocusedItemOnDoc();
  return; //done
} //moveOntoSearchedItems
//focuses on api list
function updateListFocus() {
  var id = window.api_focus_cycle_point;
  $("#" + id).addClass(window.focus_class_name);
  //now focus
  adjustScroll();
  function adjustScroll() {
    //only if something is focused
    if (!$("#names-list").find("." + window.focus_class_name).length > 0)
      return;
    //prepare variables
    var item = $("." + window.focus_class_name)[0];
    var list = $("#names-list");
    var sct = $(list).scrollTop();
    var l_offset = $(list).offset().top;
    var list_btm = $(list).height();
    var item_top = $(item).offset().top - l_offset;
    var item_btm = item_top + $(item).height() + l_offset;

    if (0 > item_top) {
      var dest = sct - Math.abs(item_top);
    } else if (list_btm < item_btm) {
      var dest = sct + item_btm - list_btm;
    } else {
      return; //otherwise, do nothing.
    }
    //now scroll
    if (window.is_names_list_scrolling === true) {
      //user is moving too fast
      list.stop();
      list.animate({ scrollTop: dest }, 0, () => {
        window.is_names_list_scrolling = false;
      });
    } else {
      //update by animation
      window.is_names_list_scrolling = true;
      list.stop(); //callback can be too early
      list.animate({ scrollTop: dest }, 200, function() {
        window.is_names_list_scrolling = false;
      });
    }
  }
}
//clears whats focused on updateListFocus()
function clearApiFocus() {
  window.api_focus_cycle_point = "";
  $("." + window.focus_class_name).each((i, item) => {
    $(item).removeClass(window.focus_class_name);
    return;
  });
}
/**
 * adjusts scroll of #documentation item, by the focused item on #names-list
 */
function moveToListFocusedItemOnDoc() {
  if (!$("#names-list").find("." + window.focus_class_name.length > 0)) {
    return; //do nothing
  }
  var focused = $("." + window.focus_class_name)[0];
  var id = "";
  //resolve name
  for (var name in window.search_db) {
    if (window.search_db[name].search_id === focused.id) {
      id = name;
      break;
    }
  }
  if (id === "") return; //abort
  //prepare variables
  var item = $("#" + id);
  var item_top = $(item).offset().top;
  var header_offset = $("header").height();
  var doc_top = $("#main").scrollTop();
  //determine destination
  var dest = Math.abs(doc_top) + item_top;//this is base
  if($(window).width()>window.window_switch_point){
    dest -= header_offset;//header is staying on wider window
  }
  //now scroll
  $("#main").animate({ scrollTop: dest }, 0);
}
