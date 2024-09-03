export const navLinks = [
    {
        label: "Home",
        route: "/",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path>
            </svg>
        ),
    },
    {
        label: "Image Restore",
        route: "/transformations/add/restore",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
                <path
                    fill="currentColor"
                    d="M216 40H72a16 16 0 0 0-16 16v16H40a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16v-16h16a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m-44 32a12 12 0 1 1-12 12a12 12 0 0 1 12-12m12 128H40V88h16v80a16 16 0 0 0 16 16h112Zm32-32H72v-47.31l30.34-30.35a8 8 0 0 1 11.32 0L163.31 140L189 114.34a8 8 0 0 1 11.31 0L216 130.07z"
                ></path>
            </svg>
        ),
    },
    {
        label: "Generative Fill",
        route: "/transformations/add/fill",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2L8.6 4.5L10 7zm12 9.8L22 14l-1.4 2.5L22 19l-2.5-1.4L17 19l1.4-2.5L17 14zM22 2l-1.4 2.5L22 7l-2.5-1.4L17 7l1.4-2.5L17 2l2.5 1.4zm-8.66 10.78l2.44-2.44l-2.12-2.12l-2.44 2.44zm1.03-5.49l2.34 2.34c.39.37.39 1.02 0 1.41L5.04 22.71c-.39.39-1.04.39-1.41 0l-2.34-2.34c-.39-.37-.39-1.02 0-1.41L12.96 7.29c.39-.39 1.04-.39 1.41 0"
                ></path>
            </svg>
        ),
    },
    {
        label: "Object Remove",
        route: "/transformations/add/remove",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M11 10h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1"
                    opacity={0.5}
                ></path>
                <path
                    fill="currentColor"
                    d="M10 11a1 1 0 0 1 1-1h3V8a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2zM4 22a2 2 0 1 1 0-4a2 2 0 0 1 0 4M4 6a2 2 0 1 1 0-4a2 2 0 0 1 0 4m16 0a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 16a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                ></path>
                <path
                    fill="currentColor"
                    d="M18.278 5a1.94 1.94 0 0 1 0-2H5.722a1.94 1.94 0 0 1 0 2zM20 18a2 2 0 0 1 1 .278V5.722a1.94 1.94 0 0 1-2 0v12.556A2 2 0 0 1 20 18M4 18a2 2 0 0 1 1 .278V5.722a1.94 1.94 0 0 1-2 0v12.556A2 2 0 0 1 4 18m14.278 1H5.722a1.94 1.94 0 0 1 0 2h12.556a1.94 1.94 0 0 1 0-2"
                    opacity={0.25}
                ></path>
            </svg>
        ),
    },
    {
        label: "Object Recolor",
        route: "/transformations/add/recolor",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12 19.58c-1.6 0-3.11-.62-4.24-1.75A5.95 5.95 0 0 1 6 13.58c0-1.58.62-3.11 1.76-4.24L12 5.1m5.66 2.83L12 2.27L6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31A7.98 7.98 0 0 0 12 21.58c2.05 0 4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31"
                ></path>
            </svg>
        ),
    },
    {
        label: "Background Remove",
        route: "/transformations/add/removeBackground",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32">
                <path
                    fill="currentColor"
                    d="M2 8.586L6.586 4h2.828L2 11.414zm0 9.828v-2.828L13.586 4h2.828l-3.062 3.062a6.53 6.53 0 0 0-3.29 3.29zm0 4.172l7.76-7.76c.202.69.515 1.334.92 1.909l-2.525 2.524a4 4 0 0 0-.896.896l-5.202 5.203A3.3 3.3 0 0 1 2 24.75zM17.826 6.76c.69.202 1.334.515 1.909.92L23.415 4h-2.83zm3.878 3.121c.354.645.6 1.357.718 2.11l6.824-6.823a3.25 3.25 0 0 0-1.747-1.081zM3.885 27.701L6.5 25.086v2.828L6.414 28H5.25a3.2 3.2 0 0 1-1.365-.3M21.5 18.5c.427 0 .838.067 1.224.19L30 11.415V8.586L20.086 18.5zm4 4v.414l4.5-4.5v-2.828l-4.991 4.991c.313.57.491 1.226.491 1.923m1.25 5.5H25.5v-.914l4.5-4.5v2.164q0 .389-.087.752l-2.411 2.41a3.3 3.3 0 0 1-.752.088M8 22.5V28h16v-5.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 8 22.5m8-4.5a5 5 0 1 0 0-10a5 5 0 0 0 0 10"
                ></path>
            </svg>
        ),
    },
    {
        label: "Profile",
        route: "/profile",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                        fill="currentColor"
                        d="M16 14a5 5 0 0 1 4.995 4.783L21 19v1a2 2 0 0 1-1.85 1.995L19 22H5a2 2 0 0 1-1.995-1.85L3 20v-1a5 5 0 0 1 4.783-4.995L8 14zM12 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
                    ></path>
                </g>
            </svg>
        ),
    },
    {
        label: "Buy Credits",
        route: "/credits",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32">
                <path
                    fill="currentColor"
                    d="M19.668 4.108a.5.5 0 0 0-.705.08L14.36 10h-2.551l5.587-7.054a2.5 2.5 0 0 1 3.522-.4l5.147 4.123a2.5 2.5 0 0 1 .522 3.33h-2.614l.907-1.052a.5.5 0 0 0-.066-.717L22.31 6.224L19.342 10h-2.544l3.95-5.026zM6 7a3 3 0 0 0-3 3v14.5A4.5 4.5 0 0 0 7.5 29h17a4.5 4.5 0 0 0 4.5-4.5v-9a4.5 4.5 0 0 0-4.5-4.5H6a1 1 0 1 1 0-2h4.58l1.596-2zm15 12h3a1 1 0 1 1 0 2h-3a1 1 0 1 1 0-2"
                ></path>
            </svg>
        ),
    },
];

export const plans = [
    {
        _id: 1,
        name: "Free",
        icon: "/assets/icons/free-plan.svg",
        price: 0,
        credits: 20,
        inclusions: [
            {
                label: "20 Free Credits",
                isIncluded: true,
            },
            {
                label: "Basic Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: false,
            },
            {
                label: "Priority Updates",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 2,
        name: "Pro Package",
        icon: "/assets/icons/free-plan.svg",
        price: 40,
        credits: 120,
        inclusions: [
            {
                label: "120 Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: true,
            },
            {
                label: "Priority Updates",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 3,
        name: "Premium Package",
        icon: "/assets/icons/free-plan.svg",
        price: 199,
        credits: 2000,
        inclusions: [
            {
                label: "2000 Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: true,
            },
            {
                label: "Priority Updates",
                isIncluded: true,
            },
        ],
    },
];

export const transformationTypes = {
    restore: {
        type: "restore",
        title: "Restore Image",
        subTitle: "Refine images by removing noise and imperfections",
        config: { restore: true },
        icon: "image.svg",
    },
    removeBackground: {
        type: "removeBackground",
        title: "Background Remove",
        subTitle: "Removes the background of the image using AI",
        config: { removeBackground: true },
        icon: "camera.svg",
    },
    fill: {
        type: "fill",
        title: "Generative Fill",
        subTitle: "Enhance an image's dimensions using AI outpainting",
        config: { fillBackground: true },
        icon: "stars.svg",
    },
    remove: {
        type: "remove",
        title: "Object Remove",
        subTitle: "Identify and eliminate objects from images",
        config: {
            remove: { prompt: "", removeShadow: true, multiple: true },
        },
        icon: "scan.svg",
    },
    recolor: {
        type: "recolor",
        title: "Object Recolor",
        subTitle: "Identify and recolor objects from the image",
        config: {
            recolor: { prompt: "", to: "", multiple: true },
        },
        icon: "filter.svg",
    },
};

export const aspectRatioOptions = {
    "1:1": {
        aspectRatio: "1:1",
        label: "Square (1:1)",
        width: 1000,
        height: 1000,
    },
    "3:4": {
        aspectRatio: "3:4",
        label: "Standard Portrait (3:4)",
        width: 1000,
        height: 1334,
    },
    "9:16": {
        aspectRatio: "9:16",
        label: "Phone Portrait (9:16)",
        width: 1000,
        height: 1778,
    },
};

export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
};

export const creditFee = -1;
