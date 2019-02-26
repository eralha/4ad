angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/templates/dir_hero_sheet_ctrll.html',
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"container_12 c-hero_sheet cf\" ng-controller=\"HeroCtrll\" ng-class=\"{'c-hero_sheet--dead' : hero.life <= 0}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <!-- WILL DISPLAY ON MOBILE -->\r" +
    "\n" +
    "      <div class=\"c-fixed_info\" dir-Top-Info>\r" +
    "\n" +
    "        <div class=\"column\">\r" +
    "\n" +
    "          <i class=\"fas fa-male\"></i> {{hero.class}} L({{hero.level}})\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"column\">\r" +
    "\n" +
    "            <i class=\"fas fa-heart\"></i> {{hero.life}}\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        <div class=\"column\">\r" +
    "\n" +
    "            <i class=\"fas fa-fist-raised\"></i> {{ hero.atkValue }}\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"column\">\r" +
    "\n" +
    "            <i class=\"fas fa-shield\"></i> {{ hero.defValue }}\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"wrapper\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"grid_12\">\r" +
    "\n" +
    "        <h1 class=\"title\">Hero sheet</h1>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"grid_12\">\r" +
    "\n" +
    "        <h1 class=\"subtitle\">Class <span>- {{hero.class}}</span></h1>\r" +
    "\n" +
    "        <div class=\"label\">\r" +
    "\n" +
    "          <select class=\"form-control\" ng-model=\"selectedClass\" ng-change=\"heroClassSelected()\">\r" +
    "\n" +
    "            <option value=\"{{emptyVal}}\">Select Class</option>\r" +
    "\n" +
    "              <option value=\"{{$index}}\" ng-repeat=\"class in heroClasses\">{{class.class}}</option>\r" +
    "\n" +
    "          </select>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"label\">\r" +
    "\n" +
    "          <input type=\"text\" class=\"form-control form-control--big\" ng-model=\"hero.epicName\" placeholder=\"Hero Epic Name\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"label\">\r" +
    "\n" +
    "          <input type=\"text\" class=\"form-control form-control--big\" ng-model=\"hero.conditionEffect\" placeholder=\"Status/Condition\"/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"label\">\r" +
    "\n" +
    "          <textarea class=\"form-control form-control--textarea\" ng-model=\"hero.customNotes\" placeholder=\"Notes\"></textarea>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"grid_6\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Level</h1>\r" +
    "\n" +
    "          <div class=\"label\">\r" +
    "\n" +
    "            <input type=\"number\" class=\"form-control\" ng-model=\"hero.level\"/>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"grid_6\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Gold</h1>\r" +
    "\n" +
    "          <div class=\"label\"><input type=\"number\" class=\"form-control\" ng-model=\"hero.gold\"/></div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      \r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"grid_12\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Abilities</h1>\r" +
    "\n" +
    "          <div class=\"label\">\r" +
    "\n" +
    "            {{hero.heroDataTbl.abilities}} {{hero.heroDataTbl.equipment}}<br />\r" +
    "\n" +
    "            Def: {{hero.heroDataTbl.def}} | Atk: {{hero.heroDataTbl.atk}}<br />\r" +
    "\n" +
    "            Gold: {{hero.heroDataTbl.gold}}\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  \r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"grid_12\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Counters</h1>\r" +
    "\n" +
    "          <div class=\"item_list item_list--counters\">\r" +
    "\n" +
    "            <div class=\"item cf\" ng-repeat=\"item in hero.customCounters track by item.id\">\r" +
    "\n" +
    "              <div class=\"name\"><input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Custom counter Name\"/></div>\r" +
    "\n" +
    "              <div class=\"ctrl\">\r" +
    "\n" +
    "                <div dir-Qty-Control=\"\" class=\"btn-group\" obj=\"item\" prop=\"controllValue\"></div>\r" +
    "\n" +
    "                <input type=\"number\" placeholder=\"1\" class=\"form-control\" ng-model=\"item.controllValue\"/>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeItem('customCounters', $index);\">X</button>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div><!-- end item -->\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn--full btn-dark\" ng-click=\"addItem('customCounters', 0);\">Add Custom counter</button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "  \r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-if=\"hero.level >= 5\">\r" +
    "\n" +
    "    <div class=\"clear\"></div>\r" +
    "\n" +
    "    <div class=\"grid_12\">\r" +
    "\n" +
    "        <h1 class=\"subtitle\">Expert Skills</h1>\r" +
    "\n" +
    "        <div class=\"item_list\">\r" +
    "\n" +
    "          <div class=\"item cf\" ng-repeat=\"item in hero.expertSkills track by item.id\">\r" +
    "\n" +
    "            <div class=\"name\" ng-click=\"addLayerItemInfo(item);\">{{item.name}}</div>\r" +
    "\n" +
    "            <div class=\"ctrl\">\r" +
    "\n" +
    "              <button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeItem('expertSkills', $index);\">X</button>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "          </div><!-- end item -->\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <select class=\"hidden_field\" id=\"itemSelectCBO\" ng-model=\"skillToAdd\" ng-change=\"addItem('expertSkills', skillToAdd);\">\r" +
    "\n" +
    "            <option value=\"{{emptyVal}}\">Selecione</option>\r" +
    "\n" +
    "            <option value=\"{{$index}}\" ng-repeat=\"item in dataExpertSkills\">{{item.name}}</option>\r" +
    "\n" +
    "          </select>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn--full btn-dark\">Add Skill</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "      \r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"grid_4\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Lanter</h1>\r" +
    "\n" +
    "          <div class=\"label\"><input class=\"form-check-input\" type=\"checkbox\" value=\"\" ng-model=\"hero.haveLanter\"/></div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"grid_4\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Bandaged</h1>\r" +
    "\n" +
    "          <div class=\"label\"><input class=\"form-check-input\" type=\"checkbox\" value=\"\" ng-model=\"hero.isBandaged\"/></div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"grid_4\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Life <span>({{hero.life}})</span></h1>\r" +
    "\n" +
    "          <div class=\"label\">\r" +
    "\n" +
    "              <select class=\"form-control\" ng-model=\"hero.wounds\">\r" +
    "\n" +
    "                <option value=\"0\">Wounds</option>\r" +
    "\n" +
    "                <option ng-value=\"{{$index + 1}}\" ng-repeat=\"item in numberList\">{{$index + 1}}</option>\r" +
    "\n" +
    "              </select>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear JS_ATK_DEF_INFO\"></div>\r" +
    "\n" +
    "      <div class=\"grid_6\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">ATK</h1>\r" +
    "\n" +
    "          <div class=\"label\"><b>{{ GETHEROATTACK(hero.SelectedWeapon) }}</b></div>\r" +
    "\n" +
    "          <div class=\"label\">\r" +
    "\n" +
    "            <select ng-model=\"hero.customAtkMod\" class=\"form-control\">\r" +
    "\n" +
    "              <option value=\"\">Custom ATK mod</option>\r" +
    "\n" +
    "              <option value=\"-5\">-5</option>\r" +
    "\n" +
    "              <option value=\"-4\">-4</option>\r" +
    "\n" +
    "              <option value=\"-3\">-3</option>\r" +
    "\n" +
    "              <option value=\"-2\">-2</option>\r" +
    "\n" +
    "              <option value=\"-1\">-1</option>\r" +
    "\n" +
    "              <option value=\"0\">0</option>\r" +
    "\n" +
    "              <option value=\"1\">+1</option>\r" +
    "\n" +
    "              <option value=\"2\">+2</option>\r" +
    "\n" +
    "              <option value=\"3\">+3</option>\r" +
    "\n" +
    "              <option value=\"4\">+4</option>\r" +
    "\n" +
    "              <option value=\"5\">+5</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"grid_6\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">DEF</h1>\r" +
    "\n" +
    "          <div class=\"label\"><b>{{ GETHERODEFENSE(hero.armorSlot1, hero.armorSlot2, hero.armorSlot3, hero.armorSlot4) }}</b></div>\r" +
    "\n" +
    "          <div class=\"label\">\r" +
    "\n" +
    "            <select ng-model=\"hero.customDefMod\" class=\"form-control\">\r" +
    "\n" +
    "                <option value=\"\">Custom DEF mod</option>\r" +
    "\n" +
    "                <option value=\"-5\">-5</option>\r" +
    "\n" +
    "                <option value=\"-4\">-4</option>\r" +
    "\n" +
    "                <option value=\"-3\">-3</option>\r" +
    "\n" +
    "                <option value=\"-2\">-2</option>\r" +
    "\n" +
    "                <option value=\"-1\">-1</option>\r" +
    "\n" +
    "                <option value=\"0\">0</option>\r" +
    "\n" +
    "                <option value=\"1\">+1</option>\r" +
    "\n" +
    "                <option value=\"2\">+2</option>\r" +
    "\n" +
    "                <option value=\"3\">+3</option>\r" +
    "\n" +
    "                <option value=\"4\">+4</option>\r" +
    "\n" +
    "                <option value=\"5\">+5</option>\r" +
    "\n" +
    "              </select>\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"flex_list flex_list--equiped\">\r" +
    "\n" +
    "        <div class=\"grid_3\">\r" +
    "\n" +
    "            <h1 class=\"subtitle\">Hand</h1>\r" +
    "\n" +
    "            <div class=\"label\">\r" +
    "\n" +
    "                <div class=\"equiped_item_img\" ng-if=\"hero.SelectedWeapon && hero.SelectedWeapon != emptyVal\">\r" +
    "\n" +
    "                  <img src=\"{{hero.weapons[hero.SelectedWeapon].image}}\" alt=\"\" ng-click=\"addLayerItemInfo(hero.weapons[hero.SelectedWeapon]);\" />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"hero.SelectedWeapon\">\r" +
    "\n" +
    "                  <option value=\"{{emptyVal}}\">None</option>\r" +
    "\n" +
    "                  <option value=\"{{$index}}\" ng-repeat=\"item in hero.weapons track by item.id\">{{item.name}}</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"grid_3\">\r" +
    "\n" +
    "            <h1 class=\"subtitle\">Off Hand</h1>\r" +
    "\n" +
    "            <div class=\"label\">\r" +
    "\n" +
    "                <div class=\"equiped_item_img\" ng-if=\"hero.SelectedWeaponOffHand && hero.SelectedWeaponOffHand != emptyVal\">\r" +
    "\n" +
    "                  <img src=\"{{hero.weapons[hero.SelectedWeaponOffHand].image}}\" alt=\"\" ng-click=\"addLayerItemInfo(hero.weapons[hero.SelectedWeaponOffHand]);\" />\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"hero.SelectedWeaponOffHand\">\r" +
    "\n" +
    "                  <option value=\"{{emptyVal}}\">None</option>\r" +
    "\n" +
    "                  <option value=\"{{$index}}\" ng-repeat=\"item in hero.weapons track by item.id\">{{item.name}}</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"grid_3\">\r" +
    "\n" +
    "            <h1 class=\"subtitle\">Armor 1</h1>\r" +
    "\n" +
    "            <div class=\"label\">\r" +
    "\n" +
    "                <div class=\"equiped_item_img\" ng-if=\"hero.armorSlot1 && hero.armorSlot1 != emptyVal\"><img src=\"{{hero.armor[hero.armorSlot1].image}}\" alt=\"\" /></div>\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"hero.armorSlot1\">\r" +
    "\n" +
    "                  <option value=\"{{emptyVal}}\">None</option>\r" +
    "\n" +
    "                  <option value=\"{{$index}}\" ng-repeat=\"item in hero.armor track by item.id\">{{item.name}}</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"grid_3\">\r" +
    "\n" +
    "            <h1 class=\"subtitle\">Armor 2</h1>\r" +
    "\n" +
    "            <div class=\"label\">\r" +
    "\n" +
    "                <div class=\"equiped_item_img\" ng-if=\"hero.armorSlot2 && hero.armorSlot2 != emptyVal\"><img src=\"{{hero.armor[hero.armorSlot2].image}}\" alt=\"\" /></div>\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"hero.armorSlot2\">\r" +
    "\n" +
    "                  <option value=\"{{emptyVal}}\">None</option>\r" +
    "\n" +
    "                  <option value=\"{{$index}}\" ng-repeat=\"item in hero.armor track by item.id\">{{item.name}}</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- rings -->\r" +
    "\n" +
    "        <div class=\"grid_3\">&nbsp;</div>\r" +
    "\n" +
    "        <div class=\"grid_3 mt_5\">\r" +
    "\n" +
    "            <h1 class=\"subtitle\">Ring 1</h1>\r" +
    "\n" +
    "            <div class=\"label\">\r" +
    "\n" +
    "                <div class=\"equiped_item_img\" ng-if=\"hero.armorSlot3 && hero.armorSlot3 != emptyVal\"><img src=\"{{hero.armor[hero.armorSlot3].image}}\" alt=\"\" /></div>\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"hero.armorSlot3\">\r" +
    "\n" +
    "                  <option value=\"{{emptyVal}}\">None</option>\r" +
    "\n" +
    "                  <option value=\"{{$index}}\" ng-repeat=\"item in hero.armor track by item.id\">{{item.name}}</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"grid_3 mt_5\">\r" +
    "\n" +
    "            <h1 class=\"subtitle\">Ring 2</h1>\r" +
    "\n" +
    "            <div class=\"label\">\r" +
    "\n" +
    "                <div class=\"equiped_item_img\" ng-if=\"hero.armorSlot4 && hero.armorSlot4 != emptyVal\"><img src=\"{{hero.armor[hero.armorSlot4].image}}\" alt=\"\" /></div>\r" +
    "\n" +
    "                <select class=\"form-control\" ng-model=\"hero.armorSlot4\">\r" +
    "\n" +
    "                  <option value=\"{{emptyVal}}\">None</option>\r" +
    "\n" +
    "                  <option value=\"{{$index}}\" ng-repeat=\"item in hero.armor track by item.id\">{{item.name}}</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"grid_3\">&nbsp;</div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"grid_12\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Weapons</h1>\r" +
    "\n" +
    "          <div class=\"item_list\">\r" +
    "\n" +
    "            <div class=\"item cf\" ng-repeat=\"item in hero.weapons track by item.id\">\r" +
    "\n" +
    "              <div class=\"name\">{{item.name}}</div>\r" +
    "\n" +
    "              <div class=\"ctrl\"><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeItem('weapons', $index);\">X</button></div>\r" +
    "\n" +
    "            </div><!-- end item -->\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <select class=\"hidden_field\" id=\"weaponSelectCBO\" ng-model=\"weaponToAdd\" ng-change=\"addItem('weapons', weaponToAdd);\">\r" +
    "\n" +
    "              <option value=\"{{emptyVal}}\">Selecione</option>\r" +
    "\n" +
    "              <option value=\"{{$index}}\" ng-repeat=\"item in dataWeapons\">{{item.name}} {{item.value}}G</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn--full btn-dark\">Add Weapon</button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"grid_12\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Armor</h1>\r" +
    "\n" +
    "          <div class=\"item_list\">\r" +
    "\n" +
    "            <div class=\"item cf\" ng-repeat=\"item in hero.armor track by item.id\">\r" +
    "\n" +
    "              <div class=\"name\">{{item.name}}</div>\r" +
    "\n" +
    "              <div class=\"ctrl\"><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeItem('armor', $index);\">X</button></div>\r" +
    "\n" +
    "            </div><!-- end item -->\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <select class=\"hidden_field\" id=\"armorSelectCBO\" ng-model=\"armorToAdd\" ng-change=\"addItem('armor', armorToAdd);\">\r" +
    "\n" +
    "                <option value=\"{{emptyVal}}\">Selecione</option>\r" +
    "\n" +
    "                <option value=\"{{$index}}\" ng-repeat=\"item in dataArmor\">{{item.name}} {{item.value}}G</option>\r" +
    "\n" +
    "              </select>\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn--full btn-dark\">Add Armor</button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "      \r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"grid_12\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Items</h1>\r" +
    "\n" +
    "          <div class=\"item_list item_list--items\">\r" +
    "\n" +
    "            <div class=\"item cf\" ng-repeat=\"item in hero.items track by item.id\">\r" +
    "\n" +
    "              <div class=\"image\" ng-click=\"addLayerItemInfo(item);\"><img src=\"{{getItemImage(item)}}\" alt=\"\"></div>\r" +
    "\n" +
    "              <div class=\"name\">{{item.name}}<br />{{item.value}}G</div>\r" +
    "\n" +
    "              <div class=\"ctrl\">\r" +
    "\n" +
    "                <div dir-Qty-Control=\"\" class=\"btn-group\" obj=\"item\" prop=\"controllValue\"></div>\r" +
    "\n" +
    "                <input type=\"number\" placeholder=\"1\" class=\"form-control\" ng-model=\"item.controllValue\"/>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeItem('items', $index);\">X</button>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div><!-- end item -->\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <select class=\"hidden_field\" id=\"itemSelectCBO\" ng-model=\"itemToAdd\" ng-change=\"addItem('items', itemToAdd);\">\r" +
    "\n" +
    "              <option value=\"{{emptyVal}}\">Selecione</option>\r" +
    "\n" +
    "              <option value=\"{{$index}}\" ng-repeat=\"item in dataItems\">{{item.name}} - {{item.value}}G</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn--full btn-dark\">Add Items</button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"grid_12\">\r" +
    "\n" +
    "          <h1 class=\"subtitle\">Spells</h1>\r" +
    "\n" +
    "          <div class=\"item_list item_list--items\">\r" +
    "\n" +
    "            <div class=\"item cf\" ng-repeat=\"item in hero.spells track by item.id\">\r" +
    "\n" +
    "              <div class=\"image\" ng-click=\"addLayerItemInfo(item);\"><img src=\"{{getItemImage(item)}}\" alt=\"\"></div>\r" +
    "\n" +
    "              <div class=\"name\">{{item.name}}</div>\r" +
    "\n" +
    "              <div class=\"ctrl\">\r" +
    "\n" +
    "                <div dir-Qty-Control=\"\" class=\"btn-group\" obj=\"item\" prop=\"controllValue\"></div>\r" +
    "\n" +
    "                <input type=\"number\" placeholder=\"1\" class=\"form-control\" ng-model=\"item.controllValue\"/>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeItem('spells', $index);\">X</button>\r" +
    "\n" +
    "              </div>\r" +
    "\n" +
    "            </div><!-- end item -->\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "          <select class=\"hidden_field\" id=\"itemSelectCBO\" ng-model=\"spellsToAdd\" ng-change=\"addItem('spells', spellsToAdd);\">\r" +
    "\n" +
    "              <option value=\"{{emptyVal}}\">Selecione</option>\r" +
    "\n" +
    "              <option value=\"{{$index}}\" ng-repeat=\"item in dataSpells\">{{item.name}}</option>\r" +
    "\n" +
    "            </select>\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn--full btn-dark\">Add Spells</button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"btn-group list hero_dice_roller\">\r" +
    "\n" +
    "          <!-- <button type=\"button\" class=\"btn btn-warning\" ng-click=\"saveSheetData();\">Save</button> -->\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-secondary\" ng-click=\"rollHeroDice(6);\">Roll d6</button>\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-secondary\" ng-click=\"rollHeroDice(8);\">Roll d8</button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>"
  );


  $templateCache.put('/templates/dir_item_info.html',
    "<div class=\"c-layer c-layer--info\">\r" +
    "\n" +
    "    <div class=\"bg\"></div>\r" +
    "\n" +
    "    <div class=\"content\">\r" +
    "\n" +
    "      <div class=\"item_img\"><img src=\"{{item.image}}\" /></div>\r" +
    "\n" +
    "      <div class=\"info\">\r" +
    "\n" +
    "        <b>{{item.name}}</b><br />\r" +
    "\n" +
    "        {{item.effect}} - {{item.value}}G\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>"
  );


  $templateCache.put('/templates/dir_layer_roll.html',
    "<div class=\"c-layer\">\r" +
    "\n" +
    "    <div class=\"bg\"></div>\r" +
    "\n" +
    "    <div class=\"content\">\r" +
    "\n" +
    "      <div class=\"roll_result\">\r" +
    "\n" +
    "        {{roll}}\r" +
    "\n" +
    "        <div ng-if=\"critical\" class=\"critical_hit\"><i class=\"fab fa-critical-role\"></i></div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"info\">\r" +
    "\n" +
    "        <b>{{hero.class}}</b> lvl {{hero.level}}<br />\r" +
    "\n" +
    "        H: {{hero.atkStr}}<br />\r" +
    "\n" +
    "        <span ng-if=\"hero.SelectedWeaponOffHand != '--'\">OH: {{hero.atkStrOH}}<br /></span>\r" +
    "\n" +
    "        {{hero.defStr}}\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <h2 class=\"wound_title\">Add/remove wounds<br />W({{hero.wounds}}) L({{hero.life}})</h2>\r" +
    "\n" +
    "      <div class=\"btn-group\">\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-success\" ng-click=\"remWound();\">-</button>\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-danger\" ng-click=\"addWound();\">+</button>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>"
  );


  $templateCache.put('/templates/dir_qty_control.html',
    "\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-success\" ng-click=\"remVal();\">-</button>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-danger\" ng-click=\"addVal();\">+</button>"
  );


  $templateCache.put('/templates/getall.html',
    "\r" +
    "\n" +
    "  <div class=\"container_12 c-sheet_list\">\r" +
    "\n" +
    "    <div class=\"wrapper\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "      \r" +
    "\n" +
    "        <div class=\"grid_12\">\r" +
    "\n" +
    "            <div ng-repeat=\"item in dataWeapons\"><img src=\"{{item.image}}\" /></div>\r" +
    "\n" +
    "            <div ng-repeat=\"item in dataItems\"><img src=\"{{item.image}}\" /></div>\r" +
    "\n" +
    "            <div ng-repeat=\"item in dataArmor\"><img src=\"{{item.image}}\" /></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n"
  );


  $templateCache.put('/templates/home.html',
    "\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  <div class=\"modal\" ng-class=\"{'modal--visible' : isCreateGameVisible}\">\r" +
    "\n" +
    "    <div class=\"modal-dialog\" role=\"document\">\r" +
    "\n" +
    "      <div class=\"modal-content\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "          <h5 class=\"modal-title\">Create New Party</h5>\r" +
    "\n" +
    "          <button type=\"button\" class=\"close\" ng-click=\"closeNewGameModal();\">\r" +
    "\n" +
    "            <span aria-hidden=\"true\">&times;</span>\r" +
    "\n" +
    "          </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body\">\r" +
    "\n" +
    "          <p>Choose a name for your party and start a new adventure.</p>\r" +
    "\n" +
    "          <div class=\"form-group\">\r" +
    "\n" +
    "            <label for=\"exampleInputEmail1\">Party Name:</label>\r" +
    "\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"newGameName\">\r" +
    "\n" +
    "          </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-footer\">\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-secondary\" ng-click=\"closeNewGameModal();\">Close</button>\r" +
    "\n" +
    "          <button type=\"button\" class=\"btn btn-primary\" ng-click=\"startNewGame();\">Start New Game</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  \r" +
    "\n" +
    "  <div class=\"container_12\">\r" +
    "\n" +
    "    <div class=\"wrapper\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "      \r" +
    "\n" +
    "      <div class=\"grid_12 c-games\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"book_image\"><a href=\"https://gumroad.com/ganeshagames?fbclid=IwAR3YnhpDU0GOi4C7OgaB3El-Cm6P1qbwQdBBIGdTSGcVavm6R_EoMsucO64\" target=\"_blank\">\r" +
    "\n" +
    "            <img src=\"/images/home_img1.jpg\" alt=\"\" /></a></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"text\">\r" +
    "\n" +
    "          Choose one of your previous saved parties, if you dont have any party created yet, just create a new one and start playing.\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <h1>Saved Parties</h1>\r" +
    "\n" +
    "        <ul class=\"list-group\">\r" +
    "\n" +
    "          <a ui-sref=\"party({partyId: item.id})\" ng-repeat=\"item in gamesData track by item.id\">\r" +
    "\n" +
    "            <li class=\"list-group-item\">{{item.name}}</li>\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <li class=\"list-group-item\" ng-if=\"gamesData.length == 0\">No Parties found, start by creating one.</li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"mt_20\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-secondary btn--full\" ng-click=\"showNewGameModal();\">Create New Party</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"mt_30 tCenter\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-secondary btn-sm mt_20\" ng-click=\"getLinkToData();\">Get link to party data</button>\r" +
    "\n" +
    "            <div class=\"alert alert-info mt_10\" ng-if=\"dataCopied\">\r" +
    "\n" +
    "              Party data link copied to clip board, use the link to access your data on another device.\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-sm mt_10 hidden\" ng-if=\"dataCopied\" ng-click=\"shareData();\">Share party on FB</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"text mt_20\">\r" +
    "\n" +
    "          This module is in developmen, ui will change with future versions.<br>\r" +
    "\n" +
    "          Beta version 0.0.1 (JS_version_{{JS_VERSION}})\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      \r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n"
  );


  $templateCache.put('/templates/parse_link.html',
    "\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  <div class=\"container_12\">\r" +
    "\n" +
    "    <div class=\"wrapper\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "      \r" +
    "\n" +
    "      <div class=\"grid_12 c-games\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <h1>Party Data</h1>\r" +
    "\n" +
    "        <div class=\"text\">\r" +
    "\n" +
    "          We detected the following party data on the url link, what do you want to do?\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <ul class=\"list-group\">\r" +
    "\n" +
    "          <a ui-sref=\"party({partyId: item.id})\" ng-repeat=\"item in linkData track by item.id\"><li class=\"list-group-item\">{{item.name}}</li></a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <li class=\"list-group-item\" ng-if=\"linkData.length == 0\">No Parties found, start by creating one.</li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"mt_20\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn--full\" ng-click=\"overwriteData();\">Overwrite Data</button>\r" +
    "\n" +
    "            <div class=\"text\">\r" +
    "\n" +
    "              This will erase your current data on this device e replace it with this party data set.\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"mt_20\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-warning btn--full\" ng-click=\"concatenateData();\">Add to current data.</button>\r" +
    "\n" +
    "            <div class=\"text\">\r" +
    "\n" +
    "              This option will merge the 2 data set's, the old data you have and this link data.\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      \r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n"
  );


  $templateCache.put('/templates/party.html',
    "\r" +
    "\n" +
    "  <div class=\"container_12 c-sheet_list\">\r" +
    "\n" +
    "    <div class=\"wrapper\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div dir-Hero-Sheet-Ctrll=\"heroSheet1\" ng-class=\"{'selected' : sheetSelected == 'heroSheet1'}\"></div>\r" +
    "\n" +
    "      <div dir-Hero-Sheet-Ctrll=\"heroSheet2\" ng-class=\"{'selected' : sheetSelected == 'heroSheet2'}\"></div>\r" +
    "\n" +
    "      <div dir-Hero-Sheet-Ctrll=\"heroSheet3\" ng-class=\"{'selected' : sheetSelected == 'heroSheet3'}\"></div>\r" +
    "\n" +
    "      <div dir-Hero-Sheet-Ctrll=\"heroSheet4\" ng-class=\"{'selected' : sheetSelected == 'heroSheet4'}\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "      <div class=\"clear\"></div>\r" +
    "\n" +
    "      <div class=\"mt_20\">\r" +
    "\n" +
    "        <a ui-sref=\"home()\"><button type=\"button\" class=\"btn btn-warning btn--full\">MAIN MENU</button></a>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"c-bottom_controlls\">\r" +
    "\n" +
    "    <div class=\"btn-group list\">\r" +
    "\n" +
    "        <!-- <button type=\"button\" class=\"btn btn-warning\" ng-click=\"saveSheetData();\">Save</button> -->\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-secondary\" ng-click=\"rollDice(6);\">Roll d6</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-secondary\" ng-click=\"rollDice(8);\">Roll d8</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"list visible_on_desktop\">\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn--full btn-primary\" ng-click=\"selectHeroSheet(1);\" ng-class=\"{'btn-success' : sheetSelected == 'heroSheet1'}\">Hero 1</button>\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn--full btn-primary\" ng-click=\"selectHeroSheet(2);\" ng-class=\"{'btn-success' : sheetSelected == 'heroSheet2'}\">Hero 2</button>\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn--full btn-primary\" ng-click=\"selectHeroSheet(3);\" ng-class=\"{'btn-success' : sheetSelected == 'heroSheet3'}\">Hero 3</button>\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn--full btn-primary\" ng-click=\"selectHeroSheet(4);\" ng-class=\"{'btn-success' : sheetSelected == 'heroSheet4'}\">Hero 4</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>"
  );

}]);
