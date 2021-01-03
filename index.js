const fs = require('fs');
const path = require('path');
const os = require('os')
const LOCATION_Z_OFFSET = 5
const Search_Delay = 5000
const Town_Mobile_Book = [81186, 60489] // 旅行者之书: 村庄移动
const zoneJson = [
	{
		ZONE_id: 7004,
		ITEM_Id: 141,
		VILLAGE_id: 61001,
		name: "1-爆炎_蛇岛"
	},
	{
		ZONE_id: 7014,
		ITEM_Id: 149,
		VILLAGE_id: 74001,
		name: "2-古龙坑"
	},
	{
		ZONE_id: 7021,
		ITEM_Id: 152,
		VILLAGE_id: 80001,
		name: "3-孵化场"
	},
	{
		ZONE_id: 7022,
		ITEM_Id: 158,
		VILLAGE_id: 79001,
		name: "4-希望村"
	}
]
const dataJson = {
	7004: [
		{
			name: "爆炎-A",
			h_ID: 4,
			t_ID: 5011,
			location: {
				x: 105778.8359375,
				y: 68078.3359375,
				z: 3210.118408203125,
			}
		},
		{
			name: "爆炎-B",
			h_ID: 4,
			t_ID: 5011,
			location: {
				x: 113024.9453125,
				y: 68483.8671875,
				z: 4283.421875,
			}
		},
		{
			name: "爆炎-C",
			h_ID: 4,
			t_ID: 5011,
			location: {
				x: 111394.5234375,
				y: 81552.5078125,
				z: 6620.1884765625,
			}
		},
		{
			name: "爆炎-D",
			h_ID: 4,
			t_ID: 5011,
			location: {
				x: 111367.078125,
				y: 89668.9296875,
				z: 7605.767578125,
			}
		},
		{
			name: "爆炎-E",
			h_ID: 4,
			t_ID: 5011,
			location: {
				x: 119100.828125,
				y: 88552.7109375,
				z: 6412.33349609375,
			}
		},
		
		{
			name: "蛇岛-A",
			h_ID: 10,
			t_ID: 99,
			location: {
				x: 77865.546875,
				y: 90398.1796875,
				z: 1485.700439453125,
			}
		},
		{
			name: "蛇岛-B",
			h_ID: 10,
			t_ID: 99,
			location: {
				x: 74800.8203125,
				y: 95632.515625,
				z: 1409.962158203125,
			}
		}
	],
	7014: [
		{
			name: "龙坑-A",
			h_ID: 38,
			t_ID: 35,
			location: {
				x: -89890,
				y: -14445.447265625,
				z: 2001.6065673828125,
			}
		},
		{
			name: "龙坑-B",
			h_ID: 38,
			t_ID: 35,
			location: {
				x: -93309.3203125,
				y: -8923.47265625,
				z: 1535.0086669921875,
			}
		},
		{
			name: "龙坑-C",
			h_ID: 38,
			t_ID: 35,
			location: {
				x: -83349.4296875,
				y: 506.79229736328125,
				z: 1282.063232421875,
			}
		}
	],
	7021: [
		{
			name: "孵化-A",
			h_ID: 57,
			t_ID: 33,
			location: {
				x: -54613.984375,
				y: 41646.12109375,
				z: 2783.886962890625,
			}
		},
		{
			name: "孵化-B",
			h_ID: 57,
			t_ID: 33,
			location: {
				x: -50985.4375,
				y: 49416.66015625,
				z: 4229.94775390625,
			}
		},
		{
			name: "孵化-C",
			h_ID: 57,
			t_ID: 33,
			location: {
				x: -59299.30859375,
				y: 53569.3046875,
				z: 4173.20263671875,
			}
		},
		{
			name: "孵化-D",
			h_ID: 57,
			t_ID: 33,
			location: {
				x: -68672.4453125,
				y: 48410.7890625,
				z: 4418.21826171875,
			}
		},
		{
			name: "孵化-E",
			h_ID: 57,
			t_ID: 33,
			location: {
				x: -71237.3359375,
				y: 56477.3359375,
				z: 4288.76171875,
			}
		}
	],
	7022: [
		{
			name: "蜥蜴A",
			h_ID: 52,
			t_ID: 9050,
			location: {
				x: -3337.882080078125,
				y: 33507.6328125,
				z: 5413.1103515625,
			}
		},
		{
			name: "蜥蜴B",
			h_ID: 52,
			t_ID: 9050,
			location: {
				x: -3870.1279296875,
				y: 50643.453125,
				z: 6306.4638671875,
			}
		},
		{
			name: "蜥蜴C",
			h_ID: 52,
			t_ID: 9050,
			location: {
				x: 2417.086669921875,
				y: 60137.69140625,
				z: 6119.5859375,
			}
		},
		{
			name: "蜥蜴D",
			h_ID: 52,
			t_ID: 9050,
			location: {
				x: 1419.126953125,
				y: 69333.484375,
				z: 7087.1298828125,
			}
		},
		
		{
			name: "蜘蛛A",
			h_ID: 51,
			t_ID: 7011,
			location: {
				x: 6778.56884765625,
				y: 48135.4375,
				z: 7111.451171875,
			}
		},
		{
			name: "蜘蛛B",
			h_ID: 51,
			t_ID: 7011,
			location: {
				x: 2881.635986328125,
				y: 52862.07421875,
				z: 6607.40576171875,
			}
		},
		{
			name: "蜘蛛C",
			h_ID: 51,
			t_ID: 7011,
			location: {
				x: 10062.0693359375,
				y: 53097.66015625,
				z: 7785.58837890625,
			}
		},
		{
			name: "蜘蛛D",
			h_ID: 51,
			t_ID: 7011,
			location: {
				x: 9971.68359375,
				y: 61297.21484375,
				z: 7764.48486328125,
			}
		}
	]
}

module.exports = function BossScanners(mod) {
	const notifier = mod.require ? mod.require.notifier : require('tera-notifier')(mod)
	
	let Enabled = false
	let AllArea = true
	let Patrol  = true
	
	let lastPos = null
	let seekPos = 0
	let nextZone = null
	let bossID = new Map()
	let bossLog
	
	let currentChannel = -1
	let playerLocation = {x: 0, y: 0, z: 0}
	let playerTime = 0
	
	mod.command.add("bs", (arg) => {
		if (!arg) {
			Enabled = !Enabled
			SendMessage("搜寻世界王: " + (Enabled ? "启动(On)" : "停止(Off)"))
			if (Enabled) {
				startSearch()
			} else {
				stopSearch()
				mod.clearAllTimeouts()
			}
		} else {
			switch (arg) {
				case 'all':
				case '全图':
					AllArea = !AllArea
					SendMessage("全图模式: " + (AllArea ? "开启(On)" : "关闭(Off)"))
					break
				case 'patrol':
				case '轮巡':
					Patrol = !Patrol
					SendMessage("轮巡模式: " + (Patrol ? "开启(On)" : "关闭(Off)"))
					break
				case 'debug':
					if (lastPos) SendMessage("h_ID: " + dataJson[mod.game.me.zone][lastPos-1].h_ID)
					if (lastPos) SendMessage("t_ID: " + dataJson[mod.game.me.zone][lastPos-1].t_ID)
					SendMessage("Enabled: " + Enabled)
					SendMessage("bossID: " + bossID)
					SendMessage("Patrol" + Patrol)
					SendMessage("nextZone " + nextZone)
					
					SendMessage("lastPos: " + lastPos)
					SendMessage("seekPos: " + seekPos)
					SendMessage("currentChannel: " + currentChannel)
					break
				default :
					SendMessage("无效的参数!")
					break
			}
		}
	})
	
	mod.command.add("bsto", (arg) => {
		if (arg && isNumber(arg) && dataJson[mod.game.me.zone]) {
			SendMessage(
				'立即传送: ' + dataJson[mod.game.me.zone][arg-1].name +
				" [" + (arg) + "/" + dataJson[mod.game.me.zone].length + "]"
			)
			Teleport(dataJson[mod.game.me.zone][arg-1].location)
		} else {
			SendMessage("无效的参数!")
		}
	})
	
	mod.command.add("tpto", (arg) => {
		TeleportToVillage(arg)
	})
	
	mod.game.on('enter_game', () => {
		bossID.clear()
	})
	
	mod.game.on('leave_loading_screen', () => {
		lastPos = null
		seekPos = 0
		
		if (Enabled && Patrol && nextZone!=null) {
			nextZone = null
			mod.setTimeout(startSearch, 5000, zoneJson[nextZone+1].ZONE_id)
		}
	})
	
	mod.hook(`C_PLAYER_LOCATION`, 5, event => {
		if (!Enabled) {
			return;
		}
		
		var correctedTime = false;
		if (playerTime > event.time) {
			event.time = (playerTime + 75);
			correctedTime = true;
		}
		Object.assign(playerLocation, event.dest);
		if (correctedTime) {
			return true;
		}
	})
	
	mod.hook('S_CURRENT_CHANNEL', 2, event => {
		currentChannel = Number(event.channel)
	})
	
	mod.hook('S_SPAWN_NPC', 11, event => {
		if (!lastPos) return
		if (!dataJson[mod.game.me.zone]) return
		if (lastPos > dataJson[mod.game.me.zone].length) return
		if (!dataJson[mod.game.me.zone][lastPos-1]) return
		if (dataJson[mod.game.me.zone][lastPos-1].h_ID != event.huntingZoneId) return
		if (dataJson[mod.game.me.zone][lastPos-1].t_ID != event.templateId) return
		
		notificationafk(currentChannel + "线 - " + dataJson[mod.game.me.zone][lastPos-1].name)
		SendMessage((currentChannel + "线 - 找到 " + dataJson[mod.game.me.zone][lastPos-1].name), 21)
		mod.log((currentChannel + "线 - 找到 " + dataJson[mod.game.me.zone][lastPos-1].name))
		SendMessage("- 停止搜寻!!")
		bossID.set(event.gameId, { h_ID: event.huntingZoneId, t_ID: event.templateId })
		stopSearch()
	})
	
	mod.hook('S_DESPAWN_NPC', 3, {order: -100}, event => {
		if (event.type != 5) return
		if (!bossID.has(event.gameId)) return
		
		SendMessage(getTime() + " " + dataJson[mod.game.me.zone][lastPos-1].name + " 被击杀!!")
		bossID.delete(event.gameId)
		
		startLog(zoneJson.find(obj => obj.ZONE_id == mod.game.me.zone).name)
		bossLog.write(getTime() + " --- " + dataJson[mod.game.me.zone][lastPos-1].name + " " + currentChannel + "线\n")
		bossLog.end()
	})
	
	function startSearch(get_id = mod.game.me.zone) {
		if (zoneJson.find(obj => obj.ZONE_id == get_id)) {
			if (lastPos) seekPos = lastPos
			
			SendMessage("- 载入 " + dataJson[mod.game.me.zone].length + "个 [BOSS位置]")
			mod.setInterval(searchBoss, Search_Delay)
		} else {
			SendMessage('- 本地区 未记录BOSS坐标!!')
			stopSearch()
		}
	}
	
	function searchBoss() {
		seekPos++
		
		if (seekPos <= dataJson[mod.game.me.zone].length) {
			SendMessage(
				"- 扫描位置 [" + (seekPos) + "/" +
				dataJson[mod.game.me.zone].length + "] " +
				dataJson[mod.game.me.zone][seekPos-1].name
			)
			Teleport(dataJson[mod.game.me.zone][seekPos-1].location)
			lastPos = seekPos
		} else if (Patrol && AllArea) {
			if (mod.game.inventory.find(Town_Mobile_Book)) {
				var zoneIndex = zoneJson.findIndex(o => o.ZONE_id==mod.game.me.zone)
				
				if ((zoneIndex+1) >= zoneJson.length) zoneIndex = -1
				
				SendMessage('- 准备移动至 [' + zoneJson[zoneIndex+1].name + "]")
				UseItem(mod.game.inventory.find(Town_Mobile_Book))
				nextZone = zoneIndex
				mod.clearAllIntervals()
				mod.setTimeout(TeleportToVillage, 2000, zoneJson[zoneIndex+1].VILLAGE_id)
				
				lastPos = null
				seekPos = 0
			} else {
				SendMessage('未开启[全图轮巡], 或未找到[村庄移动]书, 仅在本地区[轮巡]BOSS')
				seekPos = 0
			}
		} else {
			SendMessage('- 当前域[未找到]BOSS, 停止搜寻!!')
			stopSearch()
			lastPos = null
			seekPos = 0
		}
	}
	
	function stopSearch() {
		Enabled = false
		nextZone = null
		mod.clearAllIntervals()
	}
	
	function UseItem(item) {
		if (!lastPos) return
		
		mod.send('C_USE_ITEM', 3, {
			gameId: mod.game.me.gameId,
			id: item.id,
			dbid: item.dbids,
			target: 0n,
			amount: 1,
			dest: {x: 0, y: 0, z: 0},
			loc: dataJson[mod.game.me.zone][lastPos-1].location,
			w: 0,
			unk1: 0,
			unk2: 0,
			unk3: 0,
			unk4: 1
		})
	}
	
	function TeleportToVillage(id) {
		mod.send('C_REQUEST_ONGOING_FIELD_EVENT_LIST', 1, {
			
		})
		mod.send('C_TELEPORT_TO_VILLAGE', 1, {
			id: Number(id)
		})
	}
	
	function Teleport(newLoc, randomXY = 0) {
		var currTime = getSystemUpTime();
		// Our method of calculating the system uptime (that the game uses) is approximate at best
		// - ensure we do not send a packet with a timestamp earlier than the last packet (aka time travel into the past)
		// - instant S_EXIT code 16 if we do :MonkaWorry:
		if (currTime < playerTime) {
			currTime = playerTime + 50
		}
		
		playerTime = currTime;
		var direction = getDirection(newLoc, playerLocation);
		
		var modLoc = {};
		Object.assign(modLoc, newLoc);
		if (randomXY > 0) {
			modLoc.x = getRandom(modLoc.x, randomXY);
			modLoc.y = getRandom(modLoc.y, randomXY);
			modLoc.z = modLoc.z + LOCATION_Z_OFFSET // :thenk:
		}
		Object.assign(playerLocation, modLoc);
		mod.toServer('C_PLAYER_LOCATION', 5, {
			loc: modLoc,
			w: direction,
			lookdirection: direction,
			dest: modLoc,
			type: 7,
			jumpDistance: 0,
			inShuttle: false,
			time: playerTime
		});
	}
	
	function getSystemUpTime() {
		return os.uptime() * 1000 + new Date().getMilliseconds() + 150
	}
	
	function getDirection(newLoc, oldLoc) {
		return Math.atan2((newLoc.y - oldLoc.y), (newLoc.x - oldLoc.x));
	}
	
	function getRandom(base, variance) {
		return base + (Math.random() * 2 * variance) - variance;
	}
	
	function isNumber(value) {
		return !isNaN(parseFloat(value)) && !isNaN(value - 0)
	}
	
	function startLog(fileName) {
		bossLog = fs.createWriteStream(path.join(__dirname, (fileName + '.log')), {flags: 'a'});
	}
	
	function getTime() {
		var time = new Date();
		return `${add_0(time.getFullYear())}-${add_0(time.getMonth())}-${add_0(time.getDate())}  ${add_0(time.getHours())}:${add_0(time.getMinutes())}`;
	}
	
	function add_0(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	// 发送提示文字
	function SendMessage(msg, chl) {
		if (chl) {
			mod.send('S_CHAT', 3 , {
				channel: chl ? chl : 21, // 21 = 队长通知, 1 = 组队, 2 = 公会, 25 = 团长通知
				name: '搜寻日志',
				message: msg
			})
		} else {
			mod.command.message(msg)
		}
	}
	
	function notificationafk(msg, timeout) { // timeout in milsec
		notifier.notifyafk({
			title: 'TERA AFK-Notification',
			message: msg,
			wait: false, 
			sound: 'Notification.IM', 
		}, timeout)
	}
}
