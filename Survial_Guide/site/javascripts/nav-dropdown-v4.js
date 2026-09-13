(function () {
  // 与 mkdocs.yml 中「专栏篇」保持一致；新增专题时记得同步维护。
  var groups = [
    {
      title: "升学路线",
      topics: [
        ["申研规划", "申研规划/"],
        ["保研规划", "保研规划/"],
        ["暑研与暑校申请", "暑研与暑校申请/"]
      ]
    },
    {
      title: "科研与技能",
      topics: [
        ["本科生如何做科研", "本科生如何做科研/"],
        ["AI4Science 学习规划", "AI4Science学习规划/"],
        ["机器人学习规划", "机器人学习规划/"],
        ["计算物理学", "计算物理学/"],
        ["Verilog 使用说明", "Verilog代码/使用说明/"]
      ]
    },
    {
      title: "语言与生活",
      topics: [
        ["雅思备考", "雅思备考/"],
        ["行前准备", "行前准备/"],
        ["留学生做饭菜谱", "留学生做饭菜谱/"],
        ["大学牲赚钱指南", "大学牲赚钱指南/"]
      ]
    }
  ];

  var menuId = "guide-topics-menu";
  var activeTrigger = null;
  var hoverCloseTimer = null;
  var openedByClick = false;
  var canHover =
    window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function siteRoot() {
    var logo = document.querySelector(".md-header__button.md-logo");
    return logo ? logo.href : new URL("./", window.location.href).href;
  }

  function normalizePath(url) {
    var path = new URL(url, window.location.href).pathname;
    return path.replace(/index\.html$/, "").replace(/\/+$/, "") + "/";
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

  function buildColumn(root, group) {
    var col = document.createElement("div");
    col.className = "guide-mega__col";

    var title = document.createElement("p");
    title.className = "guide-mega__title";
    title.textContent = group.title;
    col.appendChild(title);

    group.topics.forEach(function (topic) {
      var anchor = document.createElement("a");
      anchor.href = new URL(topic[1], root).href;
      anchor.textContent = topic[0];
      anchor.setAttribute("role", "menuitem");
      if (normalizePath(anchor.href) === normalizePath(window.location.href)) {
        anchor.setAttribute("aria-current", "page");
        anchor.classList.add("guide-mega__link--current");
      }
      col.appendChild(anchor);
    });

    return col;
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
      var grid = document.createElement("div");
      grid.className = "guide-mega";
      groups.forEach(function (group) {
        grid.appendChild(buildColumn(root, group));
      });
      menu.replaceChildren(grid);
      menu.dataset.guideRoot = root;
    } else {
      // navigation.instant 换页后刷新当前页高亮
      menu.querySelectorAll("a[aria-current]").forEach(function (anchor) {
        anchor.removeAttribute("aria-current");
        anchor.classList.remove("guide-mega__link--current");
      });
      menu.querySelectorAll("a").forEach(function (anchor) {
        if (normalizePath(anchor.href) === normalizePath(window.location.href)) {
          anchor.setAttribute("aria-current", "page");
          anchor.classList.add("guide-mega__link--current");
        }
      });
    }

    return menu;
  }

  function closeMenu() {
    if (hoverCloseTimer) {
      window.clearTimeout(hoverCloseTimer);
      hoverCloseTimer = null;
    }

    var menu = document.getElementById(menuId);
    if (menu) {
      menu.hidden = true;
      menu.classList.remove("guide-tabs-dropdown--open");
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
    var left = Math.min(Math.max(gutter, rect.left), Math.max(gutter, viewportWidth - width - gutter));
    var top = Math.min(rect.bottom + 8, viewportHeight - gutter);

    menu.style.left = left + "px";
    menu.style.top = top + "px";
  }

  function openMenu(trigger, byClick) {
    var menu = ensureMenu(siteRoot());

    if (!menu.hidden && activeTrigger === trigger) {
      return;
    }

    if (hoverCloseTimer) {
      window.clearTimeout(hoverCloseTimer);
      hoverCloseTimer = null;
    }
    if (activeTrigger && activeTrigger !== trigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
    }

    openedByClick = !!byClick;
    activeTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    positionMenu(trigger, menu);
    // 触发一次过渡动画
    requestAnimationFrame(function () {
      menu.classList.add("guide-tabs-dropdown--open");
    });
  }

  function toggleMenu(trigger) {
    var menu = document.getElementById(menuId);

    if (menu && !menu.hidden && activeTrigger === trigger) {
      // 悬停已展开时点击保持展开,避免「hover 开 → click 关」
      if (openedByClick) {
        closeMenu();
      }
      return;
    }

    openMenu(trigger, true);
  }

  function scheduleHoverClose(trigger, menu) {
    if (!canHover) {
      return;
    }

    if (hoverCloseTimer) {
      window.clearTimeout(hoverCloseTimer);
    }
    hoverCloseTimer = window.setTimeout(function () {
      if (activeTrigger === trigger && !menu.matches(":hover")) {
        closeMenu();
      }
    }, 160);
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

      if (canHover) {
        item.addEventListener("mouseenter", function () {
          openMenu(link, false);
        });
        item.addEventListener("mouseleave", function () {
          scheduleHoverClose(link, document.getElementById(menuId));
        });
      }
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

  // 滚动时不直接关闭,而是让面板跟随触发器重新定位
  var repositionScheduled = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!activeTrigger || repositionScheduled) {
        return;
      }
      repositionScheduled = true;
      requestAnimationFrame(function () {
        repositionScheduled = false;
        var menu = document.getElementById(menuId);
        if (activeTrigger && menu && !menu.hidden) {
          positionMenu(activeTrigger, menu);
        }
      });
    },
    true
  );

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
