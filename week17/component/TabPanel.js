import { createElement, Text, Wrapper } from './createElement.js'
import { Timeline, Animation } from './animation'
import { ease, linear } from './cubicBezier'


export class TabPanel {
    constructor(type) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null);
    }

    setAttribute(name, value) {
        this.attributes.set(name)
        this[name] = value
    }

    getAttribute(name) {
        return this[name];
    }

    appendChild(child) {
        this.children.push(child);
    }

    select(i) {
        for (const view of this.childrenViews) {
            view.style.display = "none";
        }

        this.childrenViews[i].style.display = "";

        for (const view of this.titleViews) {
            view.classList.remove("selected");
        }

        this.titleViews[i].classList.add("selected");
        // this.titleViews.innerText = this.children[i].title;
    }

    render() {
        this.childrenViews = this.children.map(child => <div style="width:300px;min-height: 300px;">{child}</div>);
        this.titleViews = this.children.map((child, i) => <span onClick={() => this.select(i)}
            style="background: pink;width:300px;margin: 5px 5px 0 5px;min-height: 300px;font-size:24px;">{child.getAttribute("title") || ""}</span>);

        setTimeout(() => this.select(0), 16);

        return <div class="tab-panel" style="width:300px;">
            <h1 style="width:300px;margin: 0;">{this.titleViews}</h1>
            <div style="border: 1px solid pink;">{this.childrenViews}</div>
        </div>
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}