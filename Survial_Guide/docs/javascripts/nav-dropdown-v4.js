(function () {
  var topics = [
    ["申研规划", "申研规划/"],
    ["保研规划", "保研规划/"],
    ["机器人学习规划", "机器人学习规划/"],
    ["AI4Science 学习规划", "AI4Science学习规划/"],
    ["雅思备考", "雅思备考/"],
    ["行前准备", "行前准备/"],
    ["留学生做饭菜谱", "留学生做饭菜谱/"],
    ["计算物理学", "计算物理学/"],
    ["Verilog 使用说明", "Verilog代码/使用说明/"]
  ];

  var menuId = "guide-topics-menu";
  var activeTrigger = null;

  function siteRoot() {
    var logo = document.querySelector(".md-header__button.md-logo");
    return logo ? logo.href : new URL("./", window.location.href).href;
  }

  function directTabLink(item) {
    for (var i = 0; i < item.children.length; i += 1) {
      var child = item.children[i];
      if (child.classList && child.classList.contains("md-tabs__link")) {
        return child;
      }
    }
    return null;
  }

  function ensureMenu(root) {
    var menu = document.getElementById(menuId);

    if (!menu) {
      menu = document.createElement("div");
      menu.id = menuId;
      menu.className = "guide-tabs-dropdown guide-tabs-dropdown--portal";
      menu.setAttribute("role", "menu");
      menu.setAttribute("aria-label", "专栏篇");
      menu.hidden = true;
      document.body.appendChild(menu);
    }

    if (menu.dataset.guideRoot !== root) {
      menu.replaceChildren();
      topics.forEach(function (topic) {
        var anchor = document.createElement("a");
        anchor.href = new URL(topic[1], root).href;
        anchor.textContent = topic[0];
        anchor.setAttribute("role", "menuitem");
        menu.appendChild(anchor);
      });
      menu.dataset.guideRoot = root;
    }

    return menu;
  }

  function closeMenu() {
    var menu = document.getElementById(menuId);
    if (menu) {
      menu.hidden = true;
    }

    if (activeTrigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
    }
    activeTrigger = null;
  }

  function positionMenu(trigger, menu) {
    var rect = trigger.getBoundingClientRect();
    var viewportWidth = document.documentElement.clientWidth;
    var viewportHeight = document.documentElement.clientHeight;
    var gutter = 12;

    menu.hidden = false;
    menu.style.left = "0px";
    menu.style.top = "0px";

    var width = Math.ceil(menu.getBoundingClientRect().width);
    var left = Math.min(Math.max(gutter, rect.left), viewportWidth - width - gutter);
    var top = Math.min(rect.bottom + 6, viewportHeight - gutter);

    menu.style.left = Math.max(gutter, left) + "px";
    menu.style.top = Math.max(gutter, top) + "px";
  }

  function toggleMenu(trigger) {
    var menu = ensureMenu(siteRoot());

    if (!menu.hidden && activeTrigger === trigger) {
      closeMenu();
      return;
    }

    activeTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    positionMenu(trigger, menu);
  }

  function enhanceTabs() {
    var root = siteRoot();
    var items = document.querySelectorAll(".md-tabs__item");

    ensureMenu(root);

    items.forEach(function (item) {
      if (item.dataset.guideDropdownReady === "true") {
        return;
      }

      var link = directTabLink(item);
      if (!link || link.textContent.trim() !== "专栏篇") {
        return;
      }

      item.classList.add("guide-tabs-item--dropdown");
      item.dataset.guideDropdownReady = "true";
      link.classList.add("guide-tabs-trigger");
      link.setAttribute("aria-haspopup", "true");
      link.setAttribute("aria-expanded", "false");

      link.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu(link);
      });
    });
  }

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".guide-tabs-trigger") && !event.target.closest("#" + menuId)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", closeMenu);
  window.addEventListener("scroll", closeMenu, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceTabs);
  } else {
    enhanceTabs();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () {
      closeMenu();
      enhanceTabs();
    });
  }
})();
