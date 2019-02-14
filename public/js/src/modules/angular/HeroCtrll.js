define('module/angular/HeroCtrll', [
	'module/angular/MainCtrll',
	], function (app) {

		
		//generic controlers go here
	    app.controller('HeroCtrll', ['$scope', '$rootScope', 'dataService', 'ngProgressFactory', '$state', '$sce', '$filter', 'gameDataService', '$stateParams',
		function($scope, $rootScope, dataService, ngProgressFactory, $state, $sce, $filter, gameDataService, $stateParams) {

			var scope =  $scope;

			scope.numberList = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);

			scope.emptyVal = '--';
			scope.selectedClass = scope.emptyVal;

			var hero = {};
				hero.gold = 0;//level
				//class
				//atkValue
				//defValue
				hero.customCounter = 0;
				hero.level = 1;
				hero.clues = 0;
				hero.madness = 0;
				hero.customAtkMod = '';
				hero.customDefMod = '';
				hero.customNotes = '';
				//life
				hero.wounds = '0';
				//status
				//clues
				//madness
				//expertSkills
				hero.weapons = new Array();
				hero.armor = new Array();
				hero.items = new Array();
				hero.spells = new Array();
				hero.customCounters = new Array({name: 'Clues', controllValue:0, id:0 }, {name: 'Madness', controllValue:0, id:1 });
				//heroDataTbl

				//added later need to check this on store load
				hero.expertSkills = new Array();

			
			dataService.loadHeroData().then(function(data){
				//console.log(data);
				scope.heroClasses = data;
			});

			dataService.loadWeaponsData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataWeapons = data;
			});

			dataService.loadItemsData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataItems = data;
			});

			dataService.loadArmorData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataArmor = data;
			});

			dataService.loadSpellsData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataSpells = data;
			});

			dataService.loadSkillsData().then(function(data){
				var c = 0;
				for(var i in data){
					data[i].id = c;
					c ++;
				}
				scope.dataExpertSkills = data;
			});

			scope.heroClassSelected = function(){
				var classData = scope.heroClasses[scope.selectedClass];
				hero.class = classData.class;
				hero.heroDataTbl = classData;
			}

			scope.addItem = function(placeholder, item){
				if(placeholder == 'weapons'){ item = scope.dataWeapons[item]; }
				if(placeholder == 'items'){ item = scope.dataItems[item]; }
				if(placeholder == 'armor'){ item = scope.dataArmor[item]; }
				if(placeholder == 'spells'){ item = scope.dataSpells[item]; }
				if(placeholder == 'expertSkills'){ item = scope.dataExpertSkills[item]; }

				if(placeholder == 'customCounters'){ 
					item = { name: '', controllValue:0 };
				}

				item = angular.copy(item);

				//needs to be here DON MOVE
				item.id = Math.random()*60000000;

				if(placeholder == 'items' || placeholder == 'spells'){
					item.controllValue = 1;
				}

				//console.log(item, hero[placeholder]);
				hero[placeholder].push(item);
			}
			scope.removeItem = function(placeholder, index){
				hero[placeholder].splice(index, 1);
			}

			scope.GETHEROATTACK = function(selectedWeapon) {
				var data = -2;

				var heroName = hero.class;
				var lvl = parseInt(hero.level);
				var selectedWeapon = (hero.weapons[selectedWeapon]) ? hero.weapons[selectedWeapon].name : '';

				//console.log('selectedWeapon', selectedWeapon, heroName, lvl);

				if(selectedWeapon){
					selectedWeapon = selectedWeapon.toLocaleLowerCase();
					//console.log(selectedWeapon);

					if(String(selectedWeapon).indexOf('lh') != -1){ data = -1; }
					if(String(selectedWeapon).indexOf('1h') != -1 || String(selectedWeapon).indexOf('bow') != -1){ data = 0; }
					if(String(selectedWeapon).indexOf('2h') != -1){ data = 1; }

					if(String(selectedWeapon).indexOf('orb') != -1){ data = 0; }
					
					if(String(selectedWeapon).indexOf('+1') != -1){ data = data + 1; }
					if(String(selectedWeapon).indexOf('+2') != -1){ data = data + 2; }
					if(String(selectedWeapon).indexOf('+3') != -1){ data = data + 3; }
					if(String(selectedWeapon).indexOf('+4') != -1){ data = data + 4; }
					if(String(selectedWeapon).indexOf('+5') != -1){ data = data + 5; }
					if(String(selectedWeapon).indexOf('+6') != -1){ data = data + 6; }
					
					if(heroName == 'Warrior'){ data = data + lvl; }
					if(heroName == 'Dwarf'){ data = data + lvl; }
					if(heroName == 'Elf'){ data = data + lvl; }
					if(heroName == 'Barbarian'){ data = data + lvl; }
					if(heroName == 'Rogue'){}
					if(heroName == 'Cleric'){ data = data + Math.floor(lvl / 2); }
					if(heroName == 'Halfling'){}
					if(heroName == 'Wizard'){}
					if(heroName == 'Swashbuckler'){ data = data + Math.floor(lvl / 2); }
				}

				//reading custom modifiers from game effects
				if(hero.customAtkMod && hero.customAtkMod != ''){
					data = data + (parseInt(hero.customAtkMod));
				}

				hero.atkValue = data;
				
				return 'Attack ('+data+'+roll)';
			}

			scope.GETHERODEFENSE = function(armorSlot1, armorSlot2, armorSlot3, armorSlot4) {
				var data = 0;

				armorSlot1 = (hero.armor[armorSlot1]) ? hero.armor[armorSlot1].name : '';
				armorSlot2 = (hero.armor[armorSlot2]) ? hero.armor[armorSlot2].name : '';
				armorSlot3 = (hero.armor[armorSlot3]) ? hero.armor[armorSlot3].name : '';
				armorSlot4 = (hero.armor[armorSlot4]) ? hero.armor[armorSlot4].name : '';

				var searchArr = [armorSlot1, armorSlot2, armorSlot3, armorSlot4];

				console.log(searchArr);

				//console.log('searchArr', searchArr);
				
				var armorTypes = new Array({name:'light armor', mod: 1}, {name: 'heavy armor',mod: 2}, {name: 'shield', mod: 1});
				var plusMods = new Array({name:'+1', mod: 1}, {name:'+2', mod: 2}, {name:'+3', mod: 3}, {name:'+4', mod: 4} , {name:'+5', mod: 5});
				
				for(var i = 0; i < searchArr.length; i++){
					for(var j = 0; j < armorTypes.length; j++){
						var name = String(armorTypes[j].name).toLocaleLowerCase();
						var searchName = searchArr[i].toLocaleLowerCase();
						//console.log(searchName);
						if(String(searchName).indexOf(name) != -1){ data = data + armorTypes[j].mod; }
					}
				}
				
				for(var i = 0; i < searchArr.length; i++){
					for(var j = 0; j < plusMods.length; j++){
						var searchName = searchArr[i].toLocaleLowerCase();
						if(String(searchName).indexOf(plusMods[j].name) != -1){ data = data + plusMods[j].mod; }
					}
				}

				//class specific
				var heroName = hero.class;
				var lvl = parseInt(hero.level);
				if(heroName == 'Swashbuckler'){ data = data + Math.floor(lvl / 2); }
				if(heroName == 'Rogue'){ data = data + lvl; }

				//reading custom modifiers from game effects
				if(hero.customDefMod && hero.customDefMod != ''){
					data = data + (parseInt(hero.customDefMod));
				}

				hero.defValue = data;
				
				return 'Defense ('+data+')';
			}

			scope.getItemImage = function(item){
				if(String(item.name).indexOf('Scroll') != -1){ return 'https://blzmedia-a.akamaihd.net/d3/icons/items/large/p2_actbountyreagent_01_demonhunter_male.png'; }

				return item.image;
			}

			scope.rollHeroDice = function(dice){
				$rootScope.addLayerDice(dice, scope.sheetName);
			}

			scope.hero = hero;

			//ve se existe data gravada
			setTimeout(function(){
				var sheetName = scope.sheetName;
				var stored = gameDataService.getSheetData($stateParams.partyId, sheetName);

				//console.log('partyid', $stateParams.partyId, 'sheetname', sheetName, 'stored', stored);

				if(stored){
					stored = angular.copy(stored);
					hero = Object.assign({}, hero, stored);

					//check for missing propertis between versions
					if(!hero.expertSkills){
						hero.expertSkills = new Array();
					}

					scope.hero = hero;
					$rootScope[sheetName] = scope.hero;
					scope.$apply();
				}

				scope.$watch('hero', function(){
					//console.log(hero, scope.sheetName);
					if(hero.heroDataTbl){
						hero.life = hero.heroDataTbl.startLife + parseInt(hero.level);
						hero.life = hero.life - parseInt(hero.wounds);

						//esta linah tem de vir primeiro para não sobrepor valor negativo na var hero.atkStr
						hero.atkStrOH = scope.GETHEROATTACK(hero.SelectedWeaponOffHand);
						//vem depois
						hero.atkStr = scope.GETHEROATTACK(hero.SelectedWeapon);
						hero.defStr = scope.GETHERODEFENSE(hero.armorSlot1, hero.armorSlot2, hero.armorSlot3, hero.armorSlot4);
					}
	
					if(!$rootScope.sheetData){ $rootScope.sheetData = {}; }
	
					if(scope.sheetName){
						gameDataService.saveSheetData($stateParams.partyId, scope.sheetName, angular.copy(hero));
					}
				}, true);
			}, 10);

		}]);

    return app;

});
