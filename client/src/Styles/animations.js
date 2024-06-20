export const LANDING_PAGE_ANIMATIONS = {
    "_h1" : {
        "initial": { y: '-1000%' },
        "animate": { y: 0 },
        "transition": { type: 'spring', duration: 2 },
    },

    "_div" : {
        "transition" : {delay: 1.5, duration: 1},
        "initial"   : "hidden",
        "animate": "visible",
        "variants" : {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                },
    }
};

export const HOME_PAGE_ANIMATIONS = {
    "_div":  {
        "initial": { y: '-1000%', opacity: 0 },
        "animate": { y: 0, opacity: 1 },
        "transition": { type: 'tween', duration: 1.5 },
    }
};