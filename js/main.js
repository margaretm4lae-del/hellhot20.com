(() => {
    "use strict";


    const menuItems = [
        { href: "/", text: "Main" },
        { href: "/slot/", text: "Slot" },
        { href: "/demo/", text: "Demo" },
    ];




    function buildMenu(items) {
        const menuList = document.getElementById("menu-header-menu");
        if (!menuList) return;

        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            const li = document.createElement("li");
            li.className = "header__nav-link menu-item"; 

            const a = document.createElement("a");
            a.href = item.href;
            a.textContent = item.text;

            li.appendChild(a);
            fragment.appendChild(li);
        });
        
        menuList.appendChild(fragment);
    }

    buildMenu(menuItems);

    var sc = document.querySelector(".scroll-top__button");
    sc && sc.addEventListener("click", (function (o) {
        window.scrollTo({top: 0, behavior: "smooth"})
    }));
    let bl = document.querySelectorAll(".button-link");
    bl && bl.forEach((t => {
        t.addEventListener("click", (function () {
            let e = t.dataset.sfA;
            e && (document.location.href = e)
        }))
    }));
    const e = e => window.matchMedia("(min-width: " + e + "px)").matches;
    new class {
        constructor(t) {
            this.header = document.querySelector(t), this.menuItems = this.header.querySelectorAll("li"), this.burger = this.header.querySelector(".header__burger"), window.addEventListener("resize", (() => {
                e(1381) && this.closeBurger.call(this), this.updateHeaderHeight()
            }))
        }

        init() {
            this.initBurger(), this.initSubMenus(), this.updateHeaderHeight()
        }

        updateHeaderHeight() {
            const e = this.header.clientHeight;
            this.header.style.setProperty("--height", e + "px")
        }

        initBurger() {
            this.header.addEventListener("click", (e => this.burgerHandler(e)))
        }

        initSubMenus() {
            this.header.addEventListener("click", (e => this.subMenuHandler(e)))
        }

        subMenuHandler(t) {
            if (!e(1381)) {
                const e = t.target.closest(".has-submenu");
                e ? e.classList.toggle("active") : this.menuItems.forEach((e => e.classList.remove("active")))
            }
        }

        burgerHandler(e) {
            e.target.closest(".header__burger") === this.burger && (this.header.classList.toggle("burger-active"))
        }

        closeBurger() {
            this.header.classList.remove("burger-active"), document.body.classList.remove("no-scroll")
        }
    }(".header").init(), (() => {
        let e = document.querySelectorAll(".sf-link");
        e && e.forEach((e => {
            e.addEventListener("click", (function () {
                if ("1" === e.dataset.prevent) return;
                let t = e.dataset.sfA;
                t && (document.location.href = atob(t))
            }))
        }))
    })();

    class t {
        constructor(e, t) {
            this.btn = e;
            this.text = t;
            this.svgHTML = this.btn.querySelector("svg").outerHTML;
            this.copyTextToBuffer = this.copyTextToBuffer.bind(this);
            this.btn.addEventListener("click", () => this.copyTextToBuffer(this.text));
        }

        async copyTextToBuffer(e) {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(e);
                this.btn.classList.add("_active");
                this.btn.innerHTML = this.svgHTML + this.btn.dataset.copied;
                setTimeout(() => {
                    this.btn.classList.remove("_active");
                    this.btn.innerHTML = this.svgHTML;
                }, 2000);
            }
        }
    }

    document.querySelectorAll("[data-promocode]").forEach(e => {
        const s = e.querySelector("[data-promocode-value]").textContent.trim();
        const r = e.querySelector("[data-promocode-button]");
        new t(r, s);
    });


    const s = class {
        constructor(e) {
            this.scrollContainer = e
        }

        horizontalScrollInit() {
            const e = this.scrollContainer;
            if (e) {
                let t, s, r = !1;
                const i = 1;
                e.addEventListener("mousedown", (i => {
                    r = !0, document.body.style.cursor = "grabbing", t = i.pageX - e.offsetLeft, s = e.scrollLeft
                })), e.addEventListener("mousemove", (o => {
                    if (!r) return;
                    o.preventDefault();
                    const a = (o.pageX - e.offsetLeft - t) * i;
                    e.scrollLeft = s - a
                })), e.addEventListener("mouseup", (() => {
                    r = !1, document.body.style.cursor = "default"
                })), e.addEventListener("mouseleave", (() => {
                    r = !1, document.body.style.cursor = "default"
                })), e.addEventListener("wheel", (t => {
                    e.scrollWidth > e.clientWidth && (t.preventDefault(), e.scrollLeft += t.deltaY)
                })), e.addEventListener("scroll", (t => {
                    e.scrollWidth, e.clientWidth
                }))
            }
            return this
        }
    }, r = document.querySelectorAll(".tabs");
    r && r.forEach((e => {
        const t = e.querySelector(".tabs__header-list"), r = e.querySelectorAll(".tabs__header-button"),
            i = e.querySelectorAll(".tabs__item");
        t && (new s(t).horizontalScrollInit(), r && (r[0].classList.add("active"), r.forEach((e => {
            e.addEventListener("click", (() => {
                const t = e.dataset.tabTitle;
                e.closest(".tabs").querySelectorAll(".tabs__header-button").forEach((e => {
                    e.dataset.tabTitle === t ? e.classList.add("active") : e.classList.contains("active") && e.classList.remove("active")
                })), i.forEach((e => {
                    e.dataset.tabContent === t ? e.classList.remove("visually-hidden") : e.classList.contains("visually-hidden") || e.classList.add("visually-hidden")
                }))
            }))
        }))), i.forEach((e => {
            e.classList.add("visually-hidden")
        })), i && i[0].classList.remove("visually-hidden"))
    })), (() => {
        const e = document.querySelectorAll(".bonuses-list");
        e.length <= 0 || e.forEach((e => {
            e && new s(e).horizontalScrollInit()
        }))
    })(), (() => {
        const e = document.querySelectorAll(".galery");
        0 !== e.length && e.forEach((e => {
            new s(e).horizontalScrollInit()
        }))
    })(), (() => {
        const e = document.querySelectorAll("[data-toc]");
        e && e.forEach((e => {
            e.addEventListener("click", (e => {
                const t = e.currentTarget, s = t.querySelector("[data-toc-title]");
                e.target === s && t.classList.toggle("active")
            }))
        }))
    })(), (() => {
        const e = document.querySelectorAll(".ad-section-v1:has(.ad-section-v1__hidden-content)");
        e.length <= 0 || e.forEach((e => {
            e.addEventListener("click", (() => {
                e.classList.add("open")
            }));
            const t = e.querySelector("[data-hide-btn]");
            t && t.addEventListener("click", (t => {
                t.stopPropagation(), e.classList.remove("open")
            }))
        }))
    })();

    function createSlug(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')       
            .replace(/[^\w\-]+/g, '')   
            .replace(/\-\-+/g, '-')     
            .trim();                    
    }

    function buildTableOfContents() {
        const tocList = document.querySelector(".toc-section__toc-list");
        const headings = document.querySelectorAll("main h2:not(.faq-section__title)");
        
        if (!tocList) {
            return;
        }

        if (headings.length === 0) {
            const tocSection = tocList.closest('.toc-section');
            if (tocSection) {
                tocSection.style.display = 'none';
            }
            return;
        }

        const fragment = document.createDocumentFragment();

        headings.forEach((heading, index) => {
            const title = heading.textContent.trim();
            
            let id = heading.id;
            if (!id) {
                id = createSlug(title) || `heading-${index + 1}`;
                heading.id = id;
            }

            const li = document.createElement('li');
            li.className = 'toc-section__toc-item';
            
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = title;
            
            li.appendChild(a);
            fragment.appendChild(li);
        });

        tocList.innerHTML = '';
        tocList.appendChild(fragment);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const faqContainer = document.getElementById("faq-auto-builder");
    
        if (faqContainer) {
            const questions = faqContainer.querySelectorAll("h3");
            const newContent = document.createDocumentFragment();
    
            questions.forEach(h3 => {
                const p = h3.nextElementSibling;
    
                if (p && p.tagName === 'P') {
                    const details = document.createElement("details");
                    details.classList.add("faq-section__item");
                    details.setAttribute("close", "");
    
                    const summary = document.createElement("summary");
                    summary.appendChild(h3); 
    
                    const textDiv = document.createElement("div");
                    textDiv.classList.add("faq-section__item-text");
                    textDiv.appendChild(p);
    
                    details.appendChild(summary);
                    details.appendChild(textDiv);
    
                    newContent.appendChild(details);
                }
            });
    
            faqContainer.innerHTML = ""; 
            faqContainer.appendChild(newContent);
        }

        buildTableOfContents();
    });
   
})();