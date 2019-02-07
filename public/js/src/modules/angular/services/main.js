define('module/angular/services/main', [
	'angular'
	], function () {


	var module = angular.module('app.Services', []);


		//[{"name":"party 1","id":107622714161,"party":{"heroSheet1":{"gold":0,"level":1,"clues":0,"madness":0,"wounds":"0","weapons":[{"name":"2hSL sword","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/sword_2h_001_demonhunter_male.png","value":15,"vendor":"TRUE","effect":"","Stock":"","id":7358595.56151536}],"armor":[{"name":"heavy armor","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/chestarmor_201_demonhunter_male.png","value":50,"id":44947612.74702381},{"name":"shield","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/shield_103_demonhunter_male.png","value":30,"id":34231761.93507204},{"name":"light armor","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/chestarmor_003_demonhunter_male.png","value":30,"id":41060636.600221306}],"items":[{"name":"Bandage","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_03_demonhunter_male.png","value":5,"vendor":"TRUE","effect":"heal 1 life","stock":"","id":16799679.60517994}],"spells":[],"class":"Warrior","heroDataTbl":{"class":"Warrior","atk":"Lvl+roll+wpn","def":"roll+armor+shield","abilities":"","startLife":6,"equipment":"wpn: any; armor: any"},"life":7,"atkStr":"Attack (2+roll)","defStr":"Deffense (1)","SelectedWeapon":"0","armorSlot1":"--","armorSlot2":"2"},"heroSheet2":{"gold":0,"level":1,"clues":0,"madness":0,"wounds":"0","weapons":[{"name":"1hCR mace","image":"https://www.diablohub.com/static/images/database/items/mad_monarchs_scepter.png","value":6,"vendor":"TRUE","effect":"","Stock":"","id":43957080.212821305}],"armor":[{"name":"heavy armor","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/chestarmor_201_demonhunter_male.png","value":50,"id":53064240.28346914},{"name":"shield","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/shield_103_demonhunter_male.png","value":30,"id":36367254.931613296}],"items":[{"name":"Bandage","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_03_demonhunter_male.png","value":5,"vendor":"TRUE","effect":"heal 1 life","stock":"","id":57326318.503875904}],"spells":[],"class":"Cleric","heroDataTbl":{"class":"Cleric","atk":"1/2 lvl+roll+wpn","def":"roll+armor+shield","abilities":"Undead: lvl + roll + wpn; Healing x3 d6 + lvl;","startLife":4,"equipment":"wpn: 1H,2H,sling (no bow); armor: Any"},"life":5,"atkStr":"Attack (0+roll)","defStr":"Deffense (3)","SelectedWeapon":"0","armorSlot1":"0","armorSlot2":"1"},"heroSheet3":{"gold":0,"level":1,"clues":0,"madness":0,"wounds":"0","weapons":[{"name":"SL bow","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/bow_001_demonhunter_male.png","value":15,"vendor":"TRUE","effect":"","Stock":"","id":32441260.45584972},{"name":"1hSL axe","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/axe_1h_001_demonhunter_male.png","value":6,"vendor":"TRUE","effect":"","Stock":"","id":44369056.26370093}],"armor":[{"name":"light armor","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/chestarmor_003_demonhunter_male.png","value":30,"id":32097907.65793932}],"items":[{"name":"Bandage","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_03_demonhunter_male.png","value":5,"vendor":"TRUE","effect":"heal 1 life","stock":"","id":25719858.6648189}],"spells":[{"name":"Lightning Bolt","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/wizard_shockpulse.png","effect":"","id":6451034.717058257}],"class":"Elf","heroDataTbl":{"class":"Elf","atk":"lvl+roll+wpn","def":"roll+armor+shield","abilities":"With 2h weapon: roll + wpn always +1 vs anything with \"orc\" in name","startLife":4,"equipment":"wpn: any; armor: any"},"life":5,"atkStr":"Attack (1+roll)","defStr":"Deffense (1)","SelectedWeapon":"0","armorSlot1":"0"},"heroSheet4":{"gold":0,"level":1,"clues":0,"madness":0,"wounds":"0","weapons":[{"name":"lhSL dagger","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/dagger_004_demonhunter_male.png","value":5,"vendor":"TRUE","effect":"","Stock":"","id":45254418.93132407}],"armor":[],"items":[{"name":"Bandage","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_03_demonhunter_male.png","value":5,"vendor":"TRUE","effect":"heal 1 life","stock":"","id":51727233.6810141}],"spells":[{"name":"Lightning Bolt","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/wizard_shockpulse.png","effect":"","id":54686452.25417155},{"name":"Fireball","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/wizard_meteor.png","effect":"","id":46614498.166181624}],"class":"Wizard","heroDataTbl":{"class":"Wizard","atk":"roll+wpn","def":"roll","abilities":"spell attack: Roll + lvl; Puzzles/Riddles: +lvl","startLife":2,"equipment":"wpn: light wpn,sling; armor: none"},"life":3,"atkStr":"Attack (-1+roll)","defStr":"Deffense (0)","SelectedWeapon":"0"}}},{"name":"Party 2","id":207156922266,"party":{"heroSheet1":{"gold":108,"level":5,"clues":0,"madness":0,"wounds":"0","weapons":[{"name":"1hSL Magic Wpn +2 atck","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/unique_sword_1h_014_x1_demonhunter_male.png","value":10000,"vendor":"TRUE","effect":"","Stock":"","id":31990335.498044886},{"name":"lhCR Magic Wpn +1 atck","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/unique_ceremonialdagger_102_x1_demonhunter_male.png","value":10000,"vendor":"TRUE","effect":"","Stock":"","id":19059061.44922953},{"name":"1hSL Silver Weapon","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/unique_sword_1h_set_03_x1_demonhunter_male.png","value":"","vendor":"FALSE","effect":"","Stock":"","id":41781244.89469482}],"armor":[{"name":"heavy armor","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/chestarmor_201_demonhunter_male.png","value":50,"id":48786214.82838019}],"items":[{"name":"Fools gold","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/templar_special_102_demonhunter_male.png","value":"","vendor":"FALSE","effect":"","stock":"","id":16322280.087884154,"controllValue":2},{"name":"Jewelry","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/unique_gem_019_x1_demonhunter_male.png","value":"","vendor":"FALSE","effect":"","stock":"","id":52363474.077875085,"controllValue":795},{"name":"Potion of healing","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/healthpotionlegendary_09_demonhunter_male.png","value":100,"vendor":"TRUE","effect":"heal hero total life points","stock":"","id":45818262.22221787}],"spells":[],"class":"Warrior","heroDataTbl":{"class":"Warrior","atk":"Lvl+roll+wpn","def":"roll+armor+shield","abilities":"","startLife":6,"equipment":"wpn: any; armor: any"},"life":11,"atkStr":"Attack (7+roll)","defStr":"Deffense (2)","SelectedWeapon":"0","armorSlot1":"0"},"heroSheet2":{"gold":150,"level":5,"clues":0,"madness":0,"wounds":"0","weapons":[{"name":"lhSL Magic Wpn +1 atck","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p5_unique_dagger_003_x1_demonhunter_male.png","value":10000,"vendor":"TRUE","effect":"","Stock":"","id":10517665.323772775},{"name":"1hCR Magic Wpn +1 atck","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/unique_mace_1h_009_1xx_demonhunter_male.png","value":10000,"vendor":"TRUE","effect":"","Stock":"","id":40346805.5572922}],"armor":[{"name":"heavy armor","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/chestarmor_201_demonhunter_male.png","value":50,"id":17323857.206436012},{"name":"shield","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/shield_103_demonhunter_male.png","value":30,"id":1043757.5466403892}],"items":[{"name":"Bandage","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_03_demonhunter_male.png","value":5,"vendor":"TRUE","effect":"heal 1 life","stock":"","id":34019335.71472133},{"name":"Fools gold","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/templar_special_102_demonhunter_male.png","value":"","vendor":"FALSE","effect":"","stock":"","id":28327624.282599326,"controllValue":4},{"name":"Potion of healing","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/healthpotionlegendary_09_demonhunter_male.png","value":100,"vendor":"TRUE","effect":"heal hero total life points","stock":"","id":32391102.717741482},{"name":"Gem","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/x1_ruby_02_demonhunter_male.png","value":"","vendor":"FALSE","effect":"","stock":"","id":46492296.73764301,"controllValue":170}],"spells":[{"name":"Blessing","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/x1_crusader_heavensfury3.png","effect":"","id":54333262.47337901,"controllValue":3},{"name":"Healing","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/x1_crusader_lawsofhope2.png","effect":"","id":44641682.80266007,"controllValue":3}],"class":"Cleric","heroDataTbl":{"class":"Cleric","atk":"1/2 lvl+roll+wpn","def":"roll+armor+shield","abilities":"Undead: lvl + roll + wpn; Healing x3 d6 + lvl;","startLife":4,"equipment":"wpn: 1H,2H,sling (no bow); armor: Any"},"life":9,"atkStr":"Attack (3+roll)","defStr":"Deffense (3)","SelectedWeapon":"1","armorSlot1":"0","armorSlot2":"1"},"heroSheet3":{"gold":0,"level":5,"clues":0,"madness":0,"wounds":"0","weapons":[{"name":"SL bow","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/bow_001_demonhunter_male.png","value":15,"vendor":"TRUE","effect":"","Stock":"","id":11184757.670533175},{"name":"1hSL axe","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/axe_1h_001_demonhunter_male.png","value":6,"vendor":"TRUE","effect":"","Stock":"","id":30439732.52528066}],"armor":[{"name":"light armor","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/chestarmor_003_demonhunter_male.png","value":30,"id":5329626.004165684}],"items":[{"name":"Bandage","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_03_demonhunter_male.png","value":5,"vendor":"TRUE","effect":"heal 1 life","stock":"","id":35828075.84205975},{"name":"Lightning Arrows","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/unique_quiver_003_x1_demonhunter_male.png","value":40,"vendor":"TRUE","effect":"50% chance of spell effect","stock":5,"id":32563119.062032983,"controllValue":1},{"name":"Fire Arrows","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/quiver_207_demonhunter_male.png","value":40,"vendor":"TRUE","effect":"50 %chance of spell effect","stock":5,"id":44705784.373461954,"controllValue":5},{"name":"Potion of healing","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/healthpotionlegendary_09_demonhunter_male.png","value":100,"vendor":"TRUE","effect":"heal hero total life points","stock":"","id":18659673.811829817},{"name":"Wand of sleep x3","image":"https://www.diablohub.com/static/images/database/items/fragment_of_destiny.png","value":"","vendor":"FALSE","effect":"","stock":"","id":27665151.557834573,"controllValue":3},{"name":"Scroll Sleep","image":"","value":100,"vendor":"FALSE","effect":"","stock":"","id":13520307.547357997,"controllValue":2},{"name":"Scroll Escape","image":"","value":100,"vendor":"FALSE","effect":"","stock":"","id":17836375.340876948,"controllValue":2}],"spells":[{"name":"Lightning Bolt","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/wizard_shockpulse.png","effect":"","id":26470120.10044282,"controllValue":3},{"name":"Sleep","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/x1_crusader_smite.png","effect":"","id":28533992.32024866,"controllValue":1},{"name":"Fireball","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/wizard_meteor.png","effect":"","id":32994800.960784342,"controllValue":1}],"class":"Elf","heroDataTbl":{"class":"Elf","atk":"lvl+roll+wpn","def":"roll+armor+shield","abilities":"With 2h weapon: roll + wpn always +1 vs anything with \"orc\" in name","startLife":4,"equipment":"wpn: any; armor: any"},"life":9,"atkStr":"Attack (5+roll)","defStr":"Deffense (1)","SelectedWeapon":"0","armorSlot1":"0"},"heroSheet4":{"gold":0,"level":5,"clues":0,"madness":0,"wounds":"0","weapons":[{"name":"lhSL Magic Wpn +1 atck","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p5_unique_dagger_003_x1_demonhunter_male.png","value":10000,"vendor":"TRUE","effect":"","Stock":"","id":39439926.36856377}],"armor":[],"items":[{"name":"Bandage","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_03_demonhunter_male.png","value":5,"vendor":"TRUE","effect":"heal 1 life","stock":"","id":50459207.77498815},{"name":"Scroll Lightning Bolt","image":"","value":100,"vendor":"FALSE","effect":"","stock":"","id":25923376.001209304},{"name":"Scroll Protect","image":"","value":100,"vendor":"FALSE","effect":"","stock":"","id":58174225.740836546},{"name":"Fireball Staff","image":"https://www.diablohub.com/static/images/database/items/the_grand_vizier.png","value":"","vendor":"FALSE","effect":"","stock":"","id":42580247.90349461,"controllValue":3},{"name":"Prayer beads","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/amulet08_demonhunter_male.png","value":"","vendor":"FALSE","effect":"This is a necklace with d6 beads. Each bead is one use only. When used while a cleric performs a bless or heal, roll a d6; on a 4 or more, the bless or heal power is not counted as “spent”, and may be used again in the current adventure. One bead is used up with each roll, even if the 4+ roll fails.","stock":"","id":22924841.687608562,"controllValue":4},{"name":"Wand of sleep x3","image":"https://www.diablohub.com/static/images/database/items/fragment_of_destiny.png","value":"","vendor":"FALSE","effect":"","stock":"","id":13035542.17944138,"controllValue":2},{"name":"Small Pot of healing","image":"https://blzmedia-a.akamaihd.net/d3/icons/items/large/healthpotionbottomless_demonhunter_male.png","value":50,"vendor":"TRUE","effect":"heal half of hero life round up","stock":"","id":52866945.63561263}],"spells":[{"name":"Lightning Bolt","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/wizard_shockpulse.png","effect":"","id":20628629.825303532,"controllValue":5},{"name":"Fireball","image":"https://blzmedia-a.akamaihd.net/d3/icons/skills/64/wizard_meteor.png","effect":"","id":7126821.973618997,"controllValue":2}],"class":"Wizard","heroDataTbl":{"class":"Wizard","atk":"roll+wpn","def":"roll","abilities":"spell attack: Roll + lvl; Puzzles/Riddles: +lvl","startLife":2,"equipment":"wpn: light wpn,sling; armor: none"},"life":7,"atkStr":"Attack (0+roll)","defStr":"Deffense (0)","SelectedWeapon":"0"}}}]


        module.service('gameDataService', ['$q', '$http', '$filter', '$rootScope', function($q, $http, $filter, $rootScope) {

			var dataBaseName = 'fourADDataBase';
			var data = localStorage.getItem(dataBaseName);
				data = angular.fromJson(data);

			//se não existir data guardada associamos a um array
			/*
				estrutura:
				[
					game = {
						name: 
						id:
						party : [
							"sheet1" : {}
							"sheet2" : {}
							"sheet3" : {}
							"sheet4" : {}
						]
					}
				]
			*/
			if(!data){
				data = [];
			}

			this.getGamesData = function(){
				return data;
			}

			this.createNewGame = function(gameName){
				var obj = {};
					obj.name = gameName;
					obj.id = Math.round(Math.random()*999999999999);
					obj.party = {};

				data.push(obj);

				this.saveData();

				return obj;
			}

			this.saveSheetData = function(partyId, sheetName, sheetData){
				partyId = parseInt(partyId);
				var game = $filter('filter')(data, {id: partyId}, true)[0];

				//console.log(game, sheetName, sheetData, partyId);

				//se nao encontrar nenhuma party
				if(!game){ return; }

					game.party[sheetName] = sheetData;

				this.saveData();
			}

			this.saveData = function(){
				localStorage.setItem(dataBaseName, angular.toJson(data));
			}

			this.getSheetData = function(partyId, sheetName){
				partyId = parseInt(partyId);
				var game = $filter('filter')(data, {id: partyId}, true)[0];

				//console.log('get sheet data', game);

				return (game) ? game.party[sheetName] : null;
			}

			this.getPartyData = function(partyId){
				partyId = parseInt(partyId);
				return $filter('filter')(data, {id: partyId}, true)[0];
			}

            return this;
		}]);
		

		module.service('langService', ['$q', '$http', '$filter', '$rootScope', function($q, $http, $filter, $rootScope) {
			
			this.lang;
			this.langData = {};
			this.langDefer = $q.defer();
			this.loading;
			var sup = this;

			return this;
		}]);
	    

		module.service('dataService', ['$q', '$http', '$filter', 'langService', function($q, $http, $filter, langService) {

			this.data = {};
			this.menuData;
			this.menuDefer = {};
			this.pageListDefer = {};
			this.pagesDefer = {};
			this.loading = false;
			sup = this;

			this.loadHeroData = function(){
			    var lang = langService.lang;
				var path = '/data/heros.json';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadWeaponsData = function(){
			    var lang = langService.lang;
				var path = '/data/weapons.json';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadItemsData = function(){
			    var lang = langService.lang;
				var path = '/data/items.json';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadArmorData = function(){
			    var lang = langService.lang;
				var path = '/data/armor.json';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}

			this.loadSpellsData = function(){
			    var lang = langService.lang;
				var path = '/data/spells.json';

				//create defer object and call ajax
				var defer = $q.defer();

				//se já carregamos este url não o voltamos a carregar
				if(sup.data[path]){
					defer.resolve(sup.data[path]);
					return defer.promise;
				}

            	$http.get(path).then(function(data, status, headers, config) {
				  data = data.data;
		          sup.data[path] = data;
		          defer.resolve(sup.data[path]);
		        }, function(data, status, headers, config) {
		          defer.reject();
		        });

            	return defer.promise;
			}


            return this;
        }]);


    return module;

});
