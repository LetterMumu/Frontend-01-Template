import { createElement, Text, Wrapper } from './createElement';
import { Timeline, Animation } from './animation';
import { ease } from './cubicBezier';
import { enableGesture } from './gesture'

export class Panel{
    constructor(type) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child);
    }
    render() {
        let root = <div class="panel" style="border: 1px solid pink;width:300px">
            <h1 style="background: pink;width:100%;margin: 0;">{this.title}</h1>
            <div style="min-height: 300px">{this.children}</div>
        </div>
        return root;
    }


    mountTo(parent) {
        this.render().mountTo(parent);
    }


}