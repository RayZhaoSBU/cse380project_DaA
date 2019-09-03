var TopDownGame = TopDownGame || {};





const NAME = {
    //Scene Key
    SCENES: {
        LOAD:   "SPLASH",
        MENU:   "MENU",
        MATCH:  "MATCH",
        PLAY:   "PLAY",
        PAUSE:  "PAUSE",
        HELP:   "HELP",
        ABOUT:  "ABOUT"
    },
    //Image File of words and logo
    IMAGE: {
        LOGO:           "logo.png",
        TITLE:          "defense_and attack_title.png",
        TOUCH:          "touch_to_start.png",
        MENU:           "menu.png",
        NEW_GAME:       "new_game.png",
        HELP:           "help.png",
        ABOUT_US:       "about_us.png",
        BACK:           "back.png",
        SPELLS:         "spells.png",
        STORY:          "story.png",
        ELEMEMT:        "element.png",
        CREEPS:         "creeps.png",
        BARRACK:        "barrack.png",
        BACK:           "back.png",
        CASTLE:         "castle.png",
        MAIN_MENU:      "main_menu.png",
        TOP:            "top.png",
        BOT:            "bot.png",
        MID:            "mid.png",
        WIND:           "wind.png",
        FRIE:           "fire.png",
        WATER:          "water.png",
        EARTH:          "earth.png",
        THUNDER:        "thunder.png",
        RANGE:          "range.png",
        MELEE:          "melee.png",
        COIN:           "coin.png",
        POPULATION:     "population.png",
        ARROW:          "arrow.png",
        STAR_EARTH:     "star_earth.png",
        STAR_FIRE:      "star_fire.png",
        STAR_THUNDER:   "star_thunder.png",
        STAR_WATER:     "star_water.png",
        STAR_WIND:      "star_wind.png",
        CASTLE_ICON:    "castle_icon.png",
        BARRACK_ICON:   "barrack_icon.png",
        VICTORY:        "victory.png",
        PLAYER_A:       "playera.png",
        PLAYER_B:       "playerb.png"
    },

    //Image File Name of Sprites
    SPRITE: {
        BARRACK:        "barrack_sprite.png",
        CASTLE:         "castle_sprite.png",

        PAUSE:          "pause.png",
        MELEE_EARTH:    "melee_earth.png",
        MELEE_FIRE:     "melee_fire.png",
        MELEE_THUNDER:  "melee_thunder.png",
        MELEE_WATER:    "melee_water.png",
        MELEE_WIND:     "melee_wind.png",
        
        RANGE_EARTH:    "range_earth.png",
        RANGE_FIRE:     "range_fire.png",
        RANGE_THUNDER:  "range_thunder.png",
        RANGE_WATER:    "range_water.png",
        RANGE_WIND:     "range_wind.png",

        SPELL_EARTH:    "spell_earth.png",
        SPELL_FIRE:     "spell_fire.png",
        SPELL_FIRE_A:   "spell_fire_a.png",
        SPELL_THUNDER:  "spell_thunder.png",
        SPELL_WATER:    "spell_water.png"
    },

    AUDIO: {

        STONEFALLING:           "stoneFalling",
        LOSE1:                  "lose1",
        LOSE2:                  "lose2",
        VICTORY:                "victory",
        MENU:                   "menu",
        BGM:                    "bgm",
        CREEP1:                 "creep1",
        CREEP2:                 "creep2",
        CREEP3:                 "creep3",
        RANGE1:                 "range1",
        RANGE2:                 "range2",
        BATTLE:                 "battle",
        ERROR:                  "error",
        CLICK:                  "click",
        DESTROYED:              "destroy"
    },

    TILE: {
        TILES:         "tiles.png",
    },

    MAP:{
        TILE_MAP:      "daa.json"
    },

    LAYER:{
        BLOCK:      "block_layer",
        BACKGROUND: "background_layer"
    },

    PATH: {
        WORDS:      "./assets/images/words",
        JSON:       "./assets/JSON/",
        SPRITES:    "./assets/images/sprites/",
        TILES:      "./assets/images/tiles/",
        AUDIO:      "./assets/audio/" 
    }
};

const HELP_TEXT = {
    STORY:  "\"Defense and Attackd\" is combat between two \n"
    +       "troops in a magic world, each troop have two \n"
    +       "type of creeps, melee and range. These creeps \n"
    +       "are just mortal, but what make them powerful \n"
    +       "are the 5 nature elements, which are wind, \n" 
    +       "thunder, water, fire and earth. These elements \n"
    +       "enchant on thier weapon and armour. The \n"
    +       "player's goal is to protect his own barracks \n"
    +       "and castle. If the player loses two barracks, \n" 
    +       "or loses a barracks and base camp, the player \n"
    +       "will fail.",

    CREEPS: "There are two kinds of creeps: melee and range. \n" 
    +       "Creeps originally do not have elemental power, \n" 
    +       "but players can give strength to creeps through \n"
    +       "barracks. Each creep will have a different \n"
    +       "attack depending on the type of element that  \n"
    +       "the player assigned. At the same time, if the \n"
    +       "player loses the barracks on a certain road,  \n"
    +       "the creeps on the road will lose the power of \n"
    +       "the elements.",

    SPELLS: "Each player has two magical skills, and the\n"
    +       "player can accumulate elemental energy through \n"
    +       "the barracks. When the elemental energy reaches \n"
    +       "100, the player can select and release the \n"
    +       "magic of the corresponding element to the \n"
    +       "battlefield by dragging it from the function \n"
    +       "bar.\n",
    
    BARRACK:"Each player has two barracks. player can give\n"
    +       "creeps different elemental energy by barracks\n"
    +       "bar so that the creeps can attack with \n"
    +       "elemental power. At the same time, according \n"
    +       "to the elements that are given to the creeps, \n"
    +       "the base camp will also accumulate the \n"
    +       "corresponding spell energy. barracks has 20 \n"
    +       "health points, and whenever an enemy \n"
    +       "creeps arrive at our barracks, the barrack \n"
    +       "its health by one HP. When the barracks' \n"
    +       "will reduce health point reach 0, the barracks\n"
    +       "will be destroyed, and the creeps on the \n"
    +       "corresponding route will lose elemental power.",

    CASTLE: "The castle is the home base of the player, \n"
    +       "and the player must protect his own barracks.\n"
    +       "The castle will produce creeps at regular \n"
    +       "intervals. These creeps will follow the \n"
    +       "certain route to the opponent's barracks and \n"
    +       "castle.",
       
    ABOUT_US: "USER INTERFACE & IN-GAME HUD: \n"
    +         "    Jingyao Chen , Yiwei Zhao, Zihao Zhang\n\n"
    +         "PAINTING:\n"
    +         "    Yiwei Zhao, Zihao Zhang\n\n"
    +         "AUDIO:\n"
    +         "    Jingyao Chen , Yiwei Zhao\n\n"
    +         "ENTITY AI & SPELL DESIGN:\n"
    +         "    Zihao Zheng",
};
