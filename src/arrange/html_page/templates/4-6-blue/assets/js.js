//globals
//for focus cycling
window.last_focus_search_term = "";
window.focus_class_name = "api_cycle_focus";
window.is_names_list_scrolling = false;
window.is_main_scroll_auto = false;
window.scroll_time_ms = 400;
window.main_scroll_event_delay = 100;
window.user_scroll_detect_delay = 100;
window.is_user_scrolling_main = false;
window.dialog_notifiy_time = 2500;
window.dialog_fadeout_time = 1000;
window.modal_notoification_class = "modal-notification";
window.main_level_2_class= "main-level-2";

//for searching
//db starts from 0
//item-id-without#:{keywords:"",search_id:""}
window.search_db = {};
//css variables
window.window_switch_point = 850;
//utilities
window.util = {};
//init
$(document).ready(function() {
  initializePage();
});
//initialization
function initializePage(){
  setUpLocalNavi();
  createList(); //before prepareSearcher()
  prepareSearcher(); //search input
  prepareListNavigator(); //list navigator
  prepareGNavi();//make gnavi li level-2 item
  prepareEvents(); //initializses events
  handleWindowResize(); //resize
  navigateToLocalId(); //page load event
  prepareDocItemTools();//link copy, etc.
}
/**
 * sets up local search functionality
 */
function setUpLocalNavi() {
  //prepare toggler
  $("<div id='navi-toggler' class='page-handler'>")
    .text("📜")
    .appendTo("#main");
  //to top button
  $("<div id='to-top' class='page-handler'>")
    .text("🔺")
    .appendTo("#main");
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

//add clipboard copy buttons and its events
function prepareDocItemTools() {
  //add
  $(".doc-item").each((i, item) => {
    var box = $('<div class="item-tool-box"></div>');
    var action =
      "onClick=\"copyDocItemUrlToClipboard('" +
      item.id.replace("#", "") +
      "');\"";
    var button = $(
      '<button class="copy-to-clipboard main-level-2" ' +
        action +
        ">copy url📎</button>"
    );
    $(button).appendTo(box);
    $(box).prependTo(item);
  });
}
//id = without #
function copyDocItemUrlToClipboard(id = "") {
  if (id === "") return;
  var url = document.location.href;
  if (url.indexOf("#") > -1) url = url.substring(0, url.indexOf("#"));
  url += "#" + id;
  var input = document.createElement("input");
  document.body.appendChild(input);
  input.value = url;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  var top = $("#" + id).offset().top;
  //notify
  var $n = $(
    '<div class="' + window.modal_notoification_class + ' main-level-2"></div>'
  );
  var $p = $("<p>copied url to clipboard.(" + url + ")</p>");
  var $parent = $("#" + id);
  $n.css({
    visibility: 1,
    top: $parent.offset().top,
    width: $parent.width(),
    left: $parent.offset().left
  });
  $p.appendTo($n);
  $n.appendTo($("#main"));
  $n.delay(window.dialog_notifiy_time)
    .fadeOut(window.dialog_fadeout_time)
    .queue(function(){
      this.remove();
    });
}
//create and adds search element to DOM
function prepareSearcher() {
  $("<div id='search'>").appendTo("#api-navi");
  $("<input id='search_bar' type='text' placeholder='narrow down'>").appendTo(
    "#search"
  );
  $("<button id='obar_clear' class='button'>➖</button>").appendTo("#search");
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
    window.util.clearApiFocus();
    //initialize focus
    window.api_focus_last_focus_by_search = undefined;
  });
  //add search function
  $("#search_bar").keydown(e => search(e.code));
  $("#names-list").keydown(e => moveOntoSearchedItems(e.code));
  //disable default behavior
  $("#names-list>li>a").each((i, item) => {
    $(item).click(e => {
      e.preventDefault();
    });
  });
  //clicks on jquery
  $("#names-list>li").each((i, item) => {
    //disable children events
    //delare event on li
    $(item).click(e => {
      //update current focus
      window.util.clearApiFocus();
      window.api_focus_cycle_id = e.target.id;
      window.util.updateLocationBarId(
        window.util.getItemIdBySearchId(e.target.id)
      );
      updateListFocusClass();
      //move to the location
      moveToListFocusedItemOnDoc();
      //exit navi on mobile/tablet
      toggleNavi();
    });
  });
  //tab focus supprot on #names-list items
  $("#names-list>li>a").each((i, item) => {
    $(item).focusin(e => {
      var id = e.target.parentElement.id;
      window.util.clearApiFocus();
      window.api_focus_cycle_id = id;
      window.util.updateLocationBarId(
        window.util.getItemIdBySearchId(e.target.id)
      );
      updateListFocusClass();
      moveToListFocusedItemOnDoc();
    });
    $(item).focusout(e => {
      window.util.clearApiFocus();
    });
  });
  //navar te up and down
  $("#navi-up").click(e => {
    //38 = up key
    moveOntoSearchedItems(38);
    moveToListFocusedItemOnDoc();
    window.util.updateLocationBarId(
      window.util.getItemIdBySearchId(window.api_focus_cycle_id)
    );
  });
  $("#navi-down").click(e => {
    //40 = down key
    moveOntoSearchedItems(40);
    moveToListFocusedItemOnDoc();
    window.util.updateLocationBarId(
      window.util.getItemIdBySearchId(window.api_focus_cycle_id)
    );
  });
  $("#navi-confirm").click(e => {
    if ($("." + window.focus_class_name).length === 0) return;
    moveToListFocusedItemOnDoc();
    toggleNavi();
  });
  //toggle menu
  $("#navi-toggler").click(e => toggleNavi());
  //window resize events
  $(window).resize(handleWindowResize);
  //to top button
  $("#to-top").click(() => {
    window.util.scrollMainElement(0);
    window.util.clearLocationBarId();
    window.util.clearApiFocus();
  });
  $("#main").scroll(() => {
    handleMainScrollEvent();
    controlHeaderLevel();
  });
}
function controlHeaderLevel(){
  if($("#main").scrollTop()===0){
    $("#main header").removeClass("main-level-2");
  }else{
    $("#main header").addClass("main-level-2");
  }
}
function prepareGNavi(){
  $("#g-navi li").each((i,item)=>{
    $(item).addClass(window.main_level_2_class);
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
  if (
    $(window).width() > window.window_switch_point &&
    $("#api-navi").css("display") === "none"
  ) {
    $("#api-navi").css({
      display: "flex",
      opacity: 1
    });
  }
}
function handleMainScrollEvent() {
  if (window.is_user_scrolling_main) return;
  window.is_user_scrolling_main = true;
  setTimeout(() => {
    window.is_user_scrolling_main = false;
  }, window.user_scroll_detect_delay);
  //user sroll only
  if (window.is_main_scroll_auto === true) return;
  var id = window.util.locateCurrentlyFocusedItemId();
  if (id === "") {
    window.util.clearLocationBarId();
  } else {
    window.util.updateLocationBarId(id);
  }
  window.util.clearApiFocus();
  window.api_focus_cycle_id = window.util.getSearchIdByItemId(id);
  if (window.api_focus_cycle_id !== "") updateListFocusClass();
}
//navigate to url with id when page is loaded.
function navigateToLocalId() {
  var url = document.location.href;
  if (url.indexOf("#") === -1) return; //do nothing
  var id = url.substring(url.indexOf("#") + 1, url.length);
  //change list focus
  window.api_focus_cycle_id = window.util.getSearchIdByItemId(id);
  updateListFocusClass();
  moveToListFocusedItemOnDoc();
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
      $("#navi-toggler").css("left", "80vw");
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
      $("#navi-toggler").css("left", 0);
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
    window.util.clearApiFocus();
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
  //update list states
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
  window.util.updateLocationBarId(
    window.util.getItemIdBySearchId(window.api_focus_cycle_id)
  );
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
        if (item.id === window.api_focus_cycle_id) {
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
  window.util.clearApiFocus();
  window.api_focus_cycle_id = list[index].id;
  updateListFocusClass();
  moveToListFocusedItemOnDoc();
  return; //done
} //moveOntoSearchedItems
//focuses on api list
function updateListFocusClass() {
  var id = window.api_focus_cycle_id;
  $("#" + id).addClass(window.focus_class_name);
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
  var dest = Math.abs(doc_top) + item_top; //this is base
  if ($(window).width() > window.window_switch_point) {
    dest -= header_offset; //header is staying on wider window
  }
  window.util.scrollMainElement(dest);
}
/**
 * Utilities
 */
//clears whats focused on updateListFocusClass()
window.util.clearApiFocus = function() {
  window.api_focus_cycle_id = "";
  $("." + window.focus_class_name).each((i, item) => {
    $(item).removeClass(window.focus_class_name);
    return;
  });
};
//clears the hash
window.util.clearLocationBarId = function() {
  var url = document.location.href;
  if (url.indexOf("#") === -1) return;
  url = url.substring(0, url.indexOf("#")); //remove id clause
  history.pushState({}, "", url);
};
//moves #main to the given id location
//without #
window.util.updateLocationBarId = function(id_name) {
  if (history.pushState) {
    history.pushState(null, null, "#" + id_name);
  } else {
    location.hash = "#myhash";
  }
};
//returns the id
window.util.locateCurrentlyFocusedItemId = function() {
  var offset_start = $("header").height();
  var offset_end = $(window).height();
  //#about is visible more than half
  //meaning no item is yet being clearly scrolled to top
  var about = $("#about").offset().top + $("#about").height() / 2;
  if (offset_start < about && about < offset_end) return "";
  //check item location
  for (var id in window.search_db) {
    var top = document.getElementById(id).getBoundingClientRect().top;
    if (offset_start < top && top < offset_end) return id;
  }
  return "";
};
//returns item ids
window.util.enumerateVisibleItems = function() {
  var range = $(window).height();
  var ret = [];
  for (var id in window.search_db) {
    var rect = document.getElementById(id).getBoundingClientRect();
    if (0 < rect.top && rect.bottom < range) {
      ret.push(id);
    }
  }
  return ret;
};
//empty string when not found.
//id is without #
window.util.getSearchIdByItemId = function(id = "") {
  for (var db_id in window.search_db) {
    if (db_id === id) {
      return window.search_db[db_id].search_id;
    }
  }
  return "";
};
//scrolls to currently focused list item
window.util.adjustListScroll = function() {
  //only if something is focused
  if (!$("#names-list").find("." + window.focus_class_name).length > 0) return;
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
    list.animate({ scrollTop: dest }, window.scroll_time_ms, function() {
      window.is_names_list_scrolling = false;
    });
  }
};
window.util.scrollMainElement = function(dest = 0) {
  //do not force scroll while user is scrolling
  if (window.is_user_scrolling_main === true) return;
  if (window.is_main_scroll_auto === true) {
    $("#main").stop();
  }
  window.is_main_scroll_auto = true;
  $("#main").animate({ scrollTop: dest }, window.scroll_time_ms, () => {
    setTimeout(() => {
      window.is_main_scroll_auto = false;
    }, window.main_scroll_event_delay);
  });
};
window.util.getItemIdBySearchId = function(search_id) {
  for (var sid in window.search_db) {
    if (window.search_db[sid].search_id === search_id) return sid;
  }
  return "";
};
