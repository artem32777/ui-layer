export const iconNames = {
	"check": "check",
	"chevronDown": "chevronDown",
	"chevronRight": "chevronRight",
	"close": "close",
	"download": "download",
	"phone": "phone",
	"plus": "plus",
	"rutube": "rutube",
	"share": "share",
	"star": "star",
	"telegram": "telegram",
	"themeDark": "themeDark",
	"themeLight": "themeLight",
	"themeSystem": "themeSystem",
	"vk": "vk",
} as const

export type IconName = keyof typeof iconNames

export const iconNameList = Object.keys(iconNames) as IconName[]

export const svgIconData = {
	"check": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n\t<path\n\t\td=\"M16.6663 5L7.49967 14.1667L3.33301 10\"\n\t\tstroke=\"currentColor\"\n\t\tstroke-width=\"1.5\"\n\t\tstroke-linecap=\"round\"\n\t\tstroke-linejoin=\"round\"\n\t/>\n"},
	"chevronDown": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},"body":"<path d=\"m6 9 6 6 6-6\"/>"},
	"chevronRight": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},"body":"<path d=\"m9 18 6-6-6-6\"/>"},
	"close": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none"},"body":"\n    <path d=\"M16.2426 8.24276L12 12.4854M12 12.4854L16.2426 16.728M12 12.4854L7.75736 16.728M12 12.4854L7.75736 8.24276\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/>\r\n"},
	"download": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n    <path\r\n        d=\"M17.5 17.5H2.5M15 9.16667L10 14.1667M10 14.1667L5 9.16667M10 14.1667V2.5\"\r\n        stroke=\"currentColor\"\r\n        stroke-width=\"1.5\"\r\n        stroke-linecap=\"round\"\r\n        stroke-linejoin=\"round\"\r\n    />\r\n"},
	"phone": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},"body":"<path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\"/>"},
	"plus": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n    <path d=\"M10.0003 4.1665V15.8332M4.16699 9.99984H15.8337\"\r\n          stroke=\"currentColor\"\r\n          stroke-width=\"1.5\"\r\n          stroke-linecap=\"round\"\r\n          stroke-linejoin=\"round\"\r\n    />\r\n"},
	"rutube": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n    <g transform=\"translate(1, 2)\">\r\n        <path\r\n            fill-rule=\"evenodd\"\r\n            clip-rule=\"evenodd\"\r\n            d=\"M10.6922 3.14001C11.3641 3.13996 11.9854 3.12426 12.6522 3.21207C14.066 3.39822 15.0612 4.27481 15.306 5.69724C15.4128 6.31741 15.4072 6.81792 15.4102 7.44064C15.4206 9.67477 15.2572 11.3351 12.6974 11.793C12.8435 12.0159 13.0523 12.2801 13.2146 12.4987L15.177 15.1552C15.3759 15.4249 15.5959 15.7383 15.8035 15.9943C15.2283 15.9985 14.653 15.9995 14.0778 15.9971C13.4456 15.9997 12.8134 15.999 12.1811 15.9949C12.1287 15.8856 11.9796 15.6745 11.9063 15.5669C11.7501 15.3392 11.5953 15.1106 11.442 14.8808C10.7712 13.8754 10.036 12.8313 9.38835 11.8188C7.34708 11.8536 5.25782 11.7861 3.21802 11.8196C3.20393 12.2804 3.21544 12.8054 3.21545 13.2697L3.21515 16L0 15.9998C0.0237084 15.6824 0.00811003 15.1544 0.0078963 14.8222L0.007846 4.31469C0.00732133 3.93129 -0.00284774 3.51913 0.0106625 3.13941L10.6922 3.14001ZM10.3492 5.97672L3.21616 5.97657C3.21112 6.94503 3.19502 8.00907 3.21626 8.97255L8.94992 8.97653L10.4861 8.97451C10.8958 8.97502 11.6069 9.03446 11.9368 8.79222C12.0466 8.67433 12.0923 8.6053 12.1408 8.44587C12.2185 8.19045 12.1862 7.9288 12.1965 7.67324C12.2664 5.92681 11.9899 5.97498 10.3492 5.97672Z\"\r\n            fill=\"currentColor\"\r\n        />\r\n        <path\r\n            d=\"M16.1303 0.0158227C17.0293 -0.109102 17.8592 0.519325 17.9842 1.41947C18.109 2.31963 17.4815 3.15077 16.5825 3.27593C15.6833 3.4011 14.853 2.77266 14.7281 1.87233C14.6031 0.972008 15.2309 0.140767 16.1303 0.0158227Z\"\r\n            fill=\"currentColor\"\r\n        />\r\n    </g>\r\n"},
	"share": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n    <path\r\n        d=\"M7.15833 11.2577L12.85 14.5743M12.8417 5.42435L7.15833 8.74102M17.5 4.16602C17.5 5.54673 16.3807 6.66602 15 6.66602C13.6193 6.66602 12.5 5.54673 12.5 4.16602C12.5 2.7853 13.6193 1.66602 15 1.66602C16.3807 1.66602 17.5 2.7853 17.5 4.16602ZM7.5 9.99935C7.5 11.3801 6.38071 12.4993 5 12.4993C3.61929 12.4993 2.5 11.3801 2.5 9.99935C2.5 8.61864 3.61929 7.49935 5 7.49935C6.38071 7.49935 7.5 8.61864 7.5 9.99935ZM17.5 15.8327C17.5 17.2134 16.3807 18.3327 15 18.3327C13.6193 18.3327 12.5 17.2134 12.5 15.8327C12.5 14.452 13.6193 13.3327 15 13.3327C16.3807 13.3327 17.5 14.452 17.5 15.8327Z\"\r\n        stroke=\"white\"\r\n        stroke-width=\"1.5\"\r\n        stroke-linecap=\"round\"\r\n        stroke-linejoin=\"round\"\r\n        fill=\"none\"\r\n    />\r\n"},
	"star": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none"},"body":"\n\t<path d=\"M12 2.75L14.86 8.55L21.26 9.48L16.63 14L17.72 20.38L12 17.36L6.28 20.38L7.37 14L2.74 9.48L9.14 8.55L12 2.75Z\" fill=\"currentColor\"/>\n"},
	"telegram": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n    <path\r\n        d=\"M7.84764 12.6505L7.51681 17.3038C7.99014 17.3038 8.19514 17.1005 8.44098 16.8563L10.6601 14.7355L15.2585 18.103C16.1018 18.573 16.696 18.3255 16.9235 17.3272L19.9418 3.18385L19.9426 3.18302C20.2101 1.93635 19.4918 1.44885 18.6701 1.75469L0.928481 8.54718C-0.282352 9.01718 -0.264018 9.69218 0.722648 9.99801L5.25848 11.4088L15.7943 4.81635C16.2901 4.48802 16.741 4.66968 16.3701 4.99802L7.84764 12.6505Z\"\r\n        fill=\"currentColor\"\r\n    />\r\n"},
	"themeDark": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n\t<path\n\t\td=\"M17.5 11.15A7.5 7.5 0 1 1 8.85 2.5A6.25 6.25 0 0 0 17.5 11.15Z\"\n\t\tstroke=\"currentColor\"\n\t\tstroke-width=\"1.5\"\n\t\tstroke-linecap=\"round\"\n\t\tstroke-linejoin=\"round\"\n\t/>\n"},
	"themeLight": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n\t<circle cx=\"10\" cy=\"10\" r=\"3.25\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n\t<path\n\t\td=\"M10 1.667V3.333M10 16.667V18.333M18.333 10H16.667M3.333 10H1.667M15.893 4.107L14.714 5.286M5.286 14.714L4.107 15.893M15.893 15.893L14.714 14.714M5.286 5.286L4.107 4.107\"\n\t\tstroke=\"currentColor\"\n\t\tstroke-width=\"1.5\"\n\t\tstroke-linecap=\"round\"\n\t/>\n"},
	"themeSystem": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n\t<rect x=\"2.5\" y=\"3.333\" width=\"15\" height=\"10.834\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n\t<path d=\"M7.5 17.083H12.5M10 14.167V17.083\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n"},
	"vk": {"attrs":{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"20","viewBox":"0 0 20 20","fill":"none"},"body":"\n    <path\r\n        fill-rule=\"evenodd\"\r\n        clip-rule=\"evenodd\"\r\n        d=\"M17.2129 11.9943C17.8763 12.6238 18.5765 13.2161 19.1715 13.9091C19.4344 14.217 19.6832 14.5348 19.8736 14.8922C20.1433 15.4003 19.899 15.9593 19.4303 15.9897L16.5166 15.9884C15.7652 16.049 15.1657 15.755 14.6616 15.2556C14.2582 14.8563 13.8846 14.4312 13.4967 14.0184C13.3377 13.8497 13.1713 13.6909 12.9724 13.5654C12.5747 13.3145 12.2294 13.3913 12.0021 13.7945C11.7706 14.2046 11.7181 14.6587 11.6954 15.1157C11.6642 15.7825 11.4568 15.9578 10.7676 15.9883C9.29473 16.0558 7.89691 15.8393 6.59838 15.1171C5.45355 14.4805 4.56579 13.5818 3.79308 12.5644C2.28861 10.5833 1.13649 8.40634 0.101007 6.1684C-0.132073 5.66419 0.0383836 5.39353 0.610798 5.38395C1.56132 5.36601 2.51171 5.36728 3.46334 5.38268C3.84966 5.38817 4.10541 5.60352 4.25458 5.95822C4.76884 7.18716 5.39809 8.35639 6.18794 9.44017C6.39829 9.72871 6.61277 10.0173 6.9182 10.2203C7.25609 10.4452 7.51335 10.3707 7.67231 10.0049C7.77317 9.77291 7.81733 9.52307 7.84007 9.27464C7.91537 8.41994 7.9253 7.56671 7.79321 6.71501C7.71213 6.18347 7.40407 5.83937 6.85834 5.73878C6.57985 5.6875 6.62131 5.58679 6.75615 5.4323C6.99035 5.16586 7.21062 5 7.6497 5H10.9426C11.461 5.09944 11.5761 5.32577 11.6471 5.83273L11.6499 9.38761C11.6442 9.58387 11.7508 10.1662 12.1145 10.2961C12.4056 10.3886 12.5975 10.1623 12.7721 9.98289C13.5605 9.16964 14.1232 8.20855 14.6259 7.21335C14.849 6.77575 15.0408 6.32129 15.2267 5.86721C15.3644 5.53027 15.5806 5.36447 15.9711 5.37182L19.1403 5.37456C19.2343 5.37456 19.3294 5.37591 19.4204 5.39104C19.9544 5.47949 20.1007 5.70276 19.9358 6.20959C19.6759 7.00477 19.1703 7.66742 18.6759 8.33315C18.1473 9.04389 17.5821 9.73031 17.058 10.4453C16.5764 11.0982 16.6147 11.4272 17.2129 11.9943Z\"\r\n        fill=\"currentColor\"\r\n    />\r\n"},
} as const satisfies Record<IconName, SvgIconData>

interface SvgIconData {
	attrs: Record<string, string>
	body: string
}

export const iconGroups = [
	{
		dir: "",
		title: "Корень",
		icons: {
		"check": iconNames["check"],
		"chevronDown": iconNames["chevronDown"],
		"chevronRight": iconNames["chevronRight"],
		"close": iconNames["close"],
		"download": iconNames["download"],
		"phone": iconNames["phone"],
		"plus": iconNames["plus"],
		"rutube": iconNames["rutube"],
		"share": iconNames["share"],
		"star": iconNames["star"],
		"telegram": iconNames["telegram"],
		"themeDark": iconNames["themeDark"],
		"themeLight": iconNames["themeLight"],
		"themeSystem": iconNames["themeSystem"],
		"vk": iconNames["vk"],
		},
	},
] as const
