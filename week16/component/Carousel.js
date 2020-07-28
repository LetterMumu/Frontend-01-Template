import { createElement, Text, Wrapper } from './createElement.js';
import { Timeline, Animation } from './animation';
import { ease } from './cubicBezier';

export class Carousel {
    constructor(config) {
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
        let timeline = new Timeline;
        timeline.start();

        let positon = 0;

        let nextPicStophandler = null;

        let children = this.data.map((url, currentPosition) => {
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;

            let offset = 0;

            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStophandler);
                let currentElement = children[currentPosition];
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
            }

            let onPan = event => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let dx = event.clientX - event.startX;

                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let currentTransformValue = -500 * currentPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;
                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;

            }

            let onPanEnd = event => {
                console.log('onPanEnd');
                let direction = 0;
                let dx = event.detail.clientX - event.detail.startX;
                if (dx + offset > 250) {
                    direction = 1;
                } else if (dx + offset < -250) {
                    direction = -1;
                }

                timeline.reset();
                timeline.start();

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, 'transform', -500 - 500 * lastPosition + offset + dx, -500 - 500 * lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}%)`);
                let currentAnimation = new Animation(currentElement.style, 'transform', - 500 * currentPosition + offset + dx, - 500 * currentPosition + direction * 500, 500, 0, ease, v => `translateX(${v}%)`);
                let nextAnimation = new Animation(nextElement.style, 'transform', 500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease, v => `translateX(${v}%)`);

                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                console.log(timeline);

                positon = (positon - direction + this.data.length) % this.data.length;

                nextPicStophandler = setTimeout(nextPic, 3000);
            }

            let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanEnd} enableGesture={true} />
            element.style.transform = 'translateX(0px)';
            element.addEventListener('dragstart', event => event.preventDefault());
            return element;
        });

        let nextPic = () => {
            let nextPositon = (positon + 1) % this.data.length;

            let current = children[positon];
            let next = children[nextPositon];

            let currentAnimation = new Animation(current.style, 'transform', -100 * positon, -100 - 100 * positon, 500, 0, ease, v => `translateX(${5 * v}px)`);
            let nextAnimation = new Animation(next.style, 'transform', 100 - 100 * nextPositon, -100 * nextPositon, 500, 0, ease, v => `translateX(${5 * v}px)`);

            timeline.add(currentAnimation);
            timeline.add(nextAnimation);

            positon = nextPositon;
            nextPicStophandler = setTimeout(nextPic, 3000);
        }
        nextPicStophandler = setTimeout(nextPic, 3000);

        return <div class="carousel">
            {children}
        </div>
    }

    mountTo(parent) {
        this.render().mountTo(parent);
    }


}