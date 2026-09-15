local diff = {
	["axisDiffs"] = {
		["a2001cdnil"] = {
			["name"] = "Pitch",
			["removed"] = {
				[1] = {
					["key"] = "JOY_Y",
				},
			},
		},
		["a2002cdnil"] = {
			["name"] = "Roll",
			["removed"] = {
				[1] = {
					["key"] = "JOY_X",
				},
			},
		},
		["a2003cdnil"] = {
			["name"] = "Rudder",
			["removed"] = {
				[1] = {
					["key"] = "JOY_RZ",
				},
			},
		},
		["a3224cd3"] = {
			["name"] = "Propeller governor handle",
			["removed"] = {
				[1] = {
					["key"] = "JOY_SLIDER1",
				},
			},
		},
		["a3236cd3"] = {
			["name"] = "Throttle Lever",
			["removed"] = {
				[1] = {
					["key"] = "JOY_Z",
				},
			},
		},
	},
	["keyDiffs"] = {
		["d3918pnilu3918cd13vd1vpnilvu0"] = {
			["added"] = {
				[1] = {
					["key"] = "JOY_BTN1",
				},
			},
			["name"] = "Guns fire button",
		},
		["d3919pnilu3919cd13vd1vpnilvu0"] = {
			["added"] = {
				[1] = {
					["key"] = "JOY_BTN3",
					["reformers"] = {
						[1] = "JOY_BTN7",
					},
				},
			},
			["name"] = "Rockets fire button",
		},
		["d3958pnilu3958cd13vd1vpnilvu0"] = {
			["added"] = {
				[1] = {
					["key"] = "JOY_BTN3",
				},
			},
			["name"] = "Weapons release button",
		},
		["dnilp3519unilcd7vdnilvp-0.002vunil"] = {
			["added"] = {
				[1] = {
					["key"] = "JOY_BTN9",
				},
			},
			["name"] = "Trim, nose up",
		},
		["dnilp3519unilcd7vdnilvp0.002vunil"] = {
			["added"] = {
				[1] = {
					["key"] = "JOY_BTN12",
				},
			},
			["name"] = "Trim, nose down",
		},
		["dnilp3520unilcd7vdnilvp-0.002vunil"] = {
			["added"] = {
				[1] = {
					["key"] = "JOY_BTN10",
				},
			},
			["name"] = "Trim, left bank",
		},
		["dnilp3520unilcd7vdnilvp0.002vunil"] = {
			["added"] = {
				[1] = {
					["key"] = "JOY_BTN11",
				},
			},
			["name"] = "Trim, right bank",
		},
	},
}
return diff
