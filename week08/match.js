function match(selector, element) {
    let tagRegExp = /^[a-z]+/;
    let idRegExp = /\#[a-z]+/;
    let classRegExp = /\.[a-z]+/;

    if (!selector || !element.attributes) {
        return false;
    }
    if (idRegExp.test(selector)) {
        var attr = element.attributes.filter(attr => attr.name == 'id')[0];
        if (attr && attr.value === selector.replace("#", '')) {
            return true;
        }
    }
    if (classRegExp.test(selector)) {
        var attr = element.attributes.filter(attr => attr.name === "class")[0]
        if (attr && attr.value === selector.replace(".", ''))
            return true;
    }

    if (tagRegExp.test(selector)) {
        return true;
    }


}