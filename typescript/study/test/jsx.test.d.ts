
declare namespace JSX  {
    interface IntrinsicElements {
        a: {
            href: string
        }
        button: any;
        span: any;
        div: any;
    }

    interface ElementClass {
        render(): any;
    }

    interface ElementAttributesProperty {
        props: {}
    }

    interface ElementChildrenAttribute {
        children: {}
    }
}