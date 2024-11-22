/**
 * @name BBDGE-Badges
 * @version 1.7.2
 * @description A BetterDiscord plugin to manage and customize user badges.
 */

const { Webpack, Patcher, React, DOM, ContextMenu, showToast } = BdApi;

module.exports = class BadgeRemover {
    constructor() {
        this.patchedModules = [];
        this.discordBadges = this.initializeBadges();
        this.customBadges = [];
        this.userCustomBadges = new Map();
        this.autoRefreshInterval = null;
    }
    initializeBadges() {
        return {
            "NITRO_BADGES": [
                {
                    id: "NITRO_SUBSCRIBER",
                    name: "Nitro Subscriber",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Nitro Subscriber",
                    after_icon: "https://discordresources.com/img/discordnitro.svg"
                },
                {
                    id: "BRONZE_BADGE",
                    name: "Bronze Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Subscribing to Nitro for 1 month.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_73.png?raw=true"
                },
                {
                    id: "SILVER_BADGE",
                    name: "Silver Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Subscribing to Nitro for 3 months.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_74.png?raw=true"
                },
                {
                    id: "GOLD_BADGE",
                    name: "Gold Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Subscribing to Nitro for 6 months.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_75.png?raw=true"
                },
                {
                    id: "PLATINUM_BADGE",
                    name: "Platinum Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Subscribing to Nitro for 12 months (1 year).",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_76.png?raw=true"
                },
                {
                    id: "DIAMOND_BADGE",
                    name: "Diamond Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Subscribing to Nitro for 24 months (2 years).",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_77.png?raw=true"
                },
                {
                    id: "EMERALD_BADGE",
                    name: "Emerald Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Subscribing to Nitro for 36 months (3 years).",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_78.png?raw=true"
                },
                {
                    id: "RUBY_BADGE",
                    name: "Ruby Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Subscribing to Nitro for 60 months (5 years).",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_79.png?raw=true"
                },
                {
                    id: "FIRE_BADGE",
                    name: "Fire Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Subscribing to Nitro for 72+ months (6+ years).",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_80.png?raw=true"
                }
            ],
            "BOOST_BADGES": [
                {
                    id: "1MONTH",
                    name: "1 Month Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_81.png?raw=true"
                },
                {
                    id: "2MONTH",
                    name: "2 Months Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server for 2 months straight.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_82.png?raw=true"
                },
                {
                    id: "3MONTH",
                    name: "3 Months Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server for 3 months straight.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_83.png?raw=true"
                },
                {
                    id: "6MONTH",
                    name: "6 Months Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server for 6 months straight.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_84.png?raw=true"
                },
                {
                    id: "9MONTH",
                    name: "9 Months Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server for 9 months straight.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_85.png?raw=true"
                },
                {
                    id: "1YEAR",
                    name: "1 Year Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server for 1 year straight.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_86.png?raw=true"
                },
                {
                    id: "1YEAR3MONTH",
                    name: "1 Year 3 Months Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server for 1 year and 3 months straight.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_87.png?raw=true"
                },
                {
                    id: "1YEAR6MONTH",
                    name: "1 Year 6 Months Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server for 1 year and 6 months straight.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_88.png?raw=true"
                },
                {
                    id: "2YEAR",
                    name: "2 Years Boost",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Boost a Discord server for 2 years straight.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_89.png?raw=true"
                }                
            ],
            "STAFF_BADGES": [
                {
                    id: "DISCORD_STAFF",
                    name: "Discord Staff",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Discord Staff Member",
                    after_icon: "https://discordresources.com/img/discordstaff.svg"
                },
                {
                    id: "ALUMNI",
                    name: "Alumni",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Moderator Programs Alumni",
                    after_icon: "https://discordresources.com/img/discordmod.svg"
                },
                {
                    id: "BUG_HUNTER_NORMAL",
                    name: "Bug Hunter",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Discord Bug Hunter",
                    after_icon: "https://discordresources.com/img/discordbughunter1.svg"
                },
                {
                    id: "BUG_HUNTER_GOLDEN",
                    name: "Bug Hunter Golden",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Discord Bug Hunter Golden",
                    after_icon: "https://discordresources.com/img/discordbughunter2.svg"
                },
                {
                    id: "BUG_HUNTER_BBDGE_CUSTOM",
                    name: "BBDGE Bug Hunter",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "BBDGE Bug Hunter",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_90.png?raw=true"
                }
            ],
            "INTERNAL_BADGES": [
                {
                    id: "INTERNAL_STAFF",
                    name: "Internal Staff",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Internal Employee",
                    after_icon: "https://discordresources.com/img/server/Staff.svg"
                }
            ],
            "OTHER_BADGES": [
                {
                    id: "EARLY_SUPPORTER",
                    name: "Early Supporter",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Early Supporter",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_72.png?raw=true"
                },
                {
                    id: "PARTNERED_SERVER_OWNER",
                    name: "Partnered Server Owner",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Partnered Server Owner",
                    after_icon: "https://discordresources.com/img/discordpartner.svg"
                },
                {
                    id: "EARLY_DEVELOPER",
                    name: "Early Developer",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Early Verified Bot Developer",
                    after_icon: "https://discordresources.com/img/discordbotdev.svg"
                },
                {
                    id: "QUEST_COMPLETER",
                    name: "Quest Completer",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Completed a Quest",
                    after_icon: "https://discordresources.com/img/quest.png"
                },
                {
                    id: "LOOTBOX",
                    name: "Lootbox",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Lootbox Badge (idk)",
                    after_icon: "https://discordresources.com/img/discordlootbox.svg"
                },
                {
                    id: "ORIGINAL_USERNAME",
                    name: "Original Username",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Originally known as .gg/BBDGE (i cant grab this shit)",
                    after_icon: "https://discordresources.com/img/username.png"
                },
                {
                    id: "HYPESQUAD_EVENTS",
                    name: "HypeSquad Events",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "HypeSquad Events",
                    after_icon: "https://discordresources.com/img/hypesquadevents.svg"
                },
                {
                    id: "HYPESQUAD_BRILLIANCE",
                    name: "HypeSquad Brilliance",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "HypeSquad Brilliance",
                    after_icon: "https://discordresources.com/img/hypesquadbrilliance.svg"
                },
                {
                    id: "HYPESQUAD_BRAVERY",
                    name: "HypeSquad Bravery",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "HypeSquad Bravery",
                    after_icon: "https://discordresources.com/img/hypesquadbravery.svg"
                },
                {
                    id: "HYPESQUAD_BALANCE",
                    name: "HypeSquad Balance",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "HypeSquad Balance",
                    after_icon: "https://discordresources.com/img/hypesquadbalance.svg"
                },
                {
                    id: "HYPESQUAD_BALANCE_GOLD",
                    name: "HypeSquad Balance Gold",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "HypeSquad Balance Gold, For Snowsgiving 2019, users in the Hypesquad Balance house had their badge changed from green to gold. Discord held a money raising competition that resulted in the House of Balance winning and the badge was temporarily gold until February 3rd, 2020. This is the only animated badge that has been on Discord. It would shine every few seconds.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_98.png?raw=true"
                },
                {
                    id: "HYPESQUAD_BALANCE_KING",
                    name: "HypeSquad Balance King",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "In February of 2019, Discord teamed up with King of the Hat to make a Hypesquad Balance themed badge. Anyone in the Hypesquad Balance house was able to keep the badge for one month. King of the hat was the first game to be brought to Discord and was free for one week. A competition between the Hypesquad houses was also held, with a custom PC being given away. The user DPS Abook, who was representing HypeSquad Brilliance won the competition.",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_93.png?raw=true"
                },
                {
                    id: "ACTIVE_DEVELOPER",
                    name: "Active Developer",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Active Developer",
                    after_icon: "https://discordresources.com/img/activedeveloper.svg"
                }
            ],
            "BOT_BADGES": [
                {
                    id: "SUPPORTS_COMMANDS",
                    name: "Supports Commands",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Supports Commands",
                    after_icon: "https://discordresources.com/img/supportscommands.svg"
                },
                {
                    id: "AUTOMOD",
                    name: "Automod",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Uses Automod",
                    after_icon: "https://discordresources.com/img/automod.svg"
                },
                {
                    id: "PREMIUM_BOT",
                    name: "Premium Bot",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "This server has Bot Name premium",
                    after_icon: "https://discordresources.com/img/premiumbot.png"
                }
            ],
            "SERVER_BADGES": [
                {
                    id: "PARTNERED_SERVER",
                    name: "Partnered Server",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Given to partnered Discord servers",
                    after_icon: "https://discordresources.com/img/server/Partnered.svg"
                },
                {
                    id: "VERIFIED_SERVER",
                    name: "Verified Server",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Given to verified Discord servers",
                    after_icon: "https://discordresources.com/img/server/Verified.svg"
                },
                {
                    id: "PUBLIC_SERVER_BOOSTED",
                    name: "Public Server Boosted",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Given to servers that are part of discovery and have at least 1 boost.",
                    after_icon: "https://discordresources.com/img/server/DiscoverableBoosted.svg"
                },
                {
                    id: "PUBLIC_SERVER",
                    name: "Public Server",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Given to servers that are part of discovery.",
                    after_icon: "https://discordresources.com/img/server/Discoverable.svg"
                },
                {
                    id: "COMMUNITY_SERVER_BOOSTED",
                    name: "Community Server Boosted",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Given to servers that have community features enabled and have at least 1 boost.",
                    after_icon: "https://discordresources.com/img/server/CommunityBoosted.svg"
                },
                {
                    id: "COMMUNITY_SERVER",
                    name: "Community Server",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Given to servers that have community features enabled.",
                    after_icon: "https://discordresources.com/img/server/Community.svg"
                }
            ],
            "GUILD_BADGES": [
                {
                    id: "SWORD",
                    name: "Sword Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "WOWWWWW A SWORD!",
                    after_icon: "https://discordresources.com/img/guilds/21.svg"
                },
                {
                    id: "WATER",
                    name: "Water Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "WATER THING... WAIT NO JUST WATER",
                    after_icon: "https://discordresources.com/img/guilds/20.svg"
                },
                {
                    id: "SKULL",
                    name: "Skull Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "DA SKULL",
                    after_icon: "https://discordresources.com/img/guilds/19.svg"
                },
                {
                    id: "SHROOM",
                    name: "Shroom Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "MUSHROOM!!!!",
                    after_icon: "https://discordresources.com/img/guilds/18.svg"
                },
                {
                    id: "U?",
                    name: "U? Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "A fucking U?",
                    after_icon: "https://discordresources.com/img/guilds/17.svg"
                },
                {
                    id: "LIGHTNING",
                    name: "Lightning Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "LIGHTNING BOLT",
                    after_icon: "https://discordresources.com/img/guilds/16.svg"
                },
                {
                    id: "LEAF",
                    name: "Leaf Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "LEEF",
                    after_icon: "https://discordresources.com/img/guilds/15.svg"
                },
                {
                    id: "HEART",
                    name: "Heart Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "AWWwwWwW 💓",
                    after_icon: "https://discordresources.com/img/guilds/14.svg"
                },
                {
                    id: "FIRE",
                    name: "Fire Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "FYER!",
                    after_icon: "https://discordresources.com/img/guilds/13.svg"
                },
                {
                    id: "ARROWS?",
                    name: "Arrows Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Arrows or uh.. that one game.... with the arrows- OHHH Dance Dance Revolution!",
                    after_icon: "https://discordresources.com/img/guilds/12.svg"
                },
                {
                    id: "EMERALDS?",
                    name: "Emeralds Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Emeralds, discord please fix this...",
                    after_icon: "https://discordresources.com/img/guilds/11.svg"
                },
                {
                    id: "FLOWER",
                    name: "Flower Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Bloomed Flower",
                    after_icon: "https://discordresources.com/img/guilds/10.svg"
                },
                {
                    id: "HEATWAVE",
                    name: "Heatwave Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Definitely a Heatwave!",
                    after_icon: "https://discordresources.com/img/guilds/9.svg"
                },
                {
                    id: "CRYSTAL",
                    name: "Crystal Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Crystal or something?",
                    after_icon: "https://discordresources.com/img/guilds/8.svg"
                },
                {
                    id: "FIREBALL",
                    name: "Fireball Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "NOW THIS IS A FIREBALL!!!",
                    after_icon: "https://discordresources.com/img/guilds/7.svg"
                },
                {
                    id: "SHELL?",
                    name: "Shell Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Shell maybe????????",
                    after_icon: "https://discordresources.com/img/guilds/6.svg"
                },
                {
                    id: "WHAT?!?!",
                    name: "What Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Honestly I have no clue",
                    after_icon: "https://discordresources.com/img/guilds/5.svg"
                },
                {
                    id: "BULLETINICE",
                    name: "Bulletin Ice Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Ice Bullet? Wtf",
                    after_icon: "https://discordresources.com/img/guilds/4.svg"
                },
                {
                    id: "idek",
                    name: "IDK Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "I can't even take a stab at it",
                    after_icon: "https://discordresources.com/img/guilds/3.svg"
                },
                {
                    id: "ARROW",
                    name: "Arrow Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Arrow kinda?",
                    after_icon: "https://discordresources.com/img/guilds/2.svg"
                },
                {
                    id: "STEM",
                    name: "Stem Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Stem looking thing",
                    after_icon: "https://discordresources.com/img/guilds/1.svg"
                }
            ],
            "CUSTOM_BADGES": [
                {
                    id: "CLOWN",
                    name: "Clown Badge",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "You're a Clown (bitch)",
                    after_icon: "https://github.com/b1aidsofficial/BBDGE/blob/main/ICO/New_Project_91.png?raw=true"
                },
            ],
            "SPECIAL_FLAIRS": [
                {
                    id: "OFFICIAL",
                    name: "Official",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Reserved for Discord official system or automod messages. (New)",
                    after_icon: "https://discordresources.com/img/special/Official.svg"
                },
                {
                    id: "SYSTEM",
                    name: "System",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Reserved for Discord system or automod messages. (Old)",
                    after_icon: "https://discordresources.com/img/special/System.svg"
                },
                {
                    id: "SERVER",
                    name: "Server",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Reserved by a webhook by following a channel.",
                    after_icon: "https://discordresources.com/img/special/Server.svg"
                },
                {
                    id: "BOT",
                    name: "Bot",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Obtained by a verified bot.",
                    after_icon: "https://discordresources.com/img/special/VerifiedBot.svg"
                },
                {
                    id: "APP",
                    name: "App",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Obtained by a verified app.",
                    after_icon: "https://discordresources.com/img/special/VerifiedApp.svg"
                },
                {
                    id: "BETA",
                    name: "Beta",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Reserved for in beta features (Also off center).",
                    after_icon: "https://discordresources.com/img/special/Beta.svg"
                },
                {
                    id: "AI",
                    name: "AI",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Only for the Clyde AI bot. (BUT I GAVE IT TO YOU HEHE)",
                    after_icon: "https://discordresources.com/img/special/LightAi.svg"
                },
                {
                    id: "OP",
                    name: "Original Poster",
                    icon: "2ba85e8026a8614b640c2837bcdfe21b",
                    description: "Given to the original poster of a forum post.",
                    after_icon: "https://discordresources.com/img/special/OriginalPoster.svg"
                }
            ]
        };
    }
    getName() {
        return "BBDGE-Badges";
    }

    getDescription() {
        return "A BetterDiscord Plugin to manage and customize user badges with a prettier UI.";
    }

    getVersion() {
        return "1.7.2";
    }

    getAuthor() {
        return "b1aids";
    }
    start() {
        this.addCustomStyles();
        this.patchUserProfiles();
        this.addContextMenuButton();
        this.startAutoRefresh();
        showToast(`${this.getName()} started successfully.`, { type: "success" });
    }

    stop() {
        this.patchedModules.forEach((unpatch) => unpatch());
        this.patchedModules = [];
        DOM.removeStyle(this.getName());
        clearInterval(this.autoRefreshInterval);
        showToast(`${this.getName()} stopped successfully.`, { type: "info" });
    }

    addCustomStyles() {
        DOM.addStyle(
            this.getName(),
            `
            .custom-badge-container {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .custom-badge-wrapper {
                position: relative;
                width: 22px;
                height: 22px;
            }

            .custom-badge {
                width: 100%;
                height: 100%;
                object-fit: contain;
                cursor: pointer;
                transition: transform 0.2s ease;
            }

            .custom-badge:hover {
                transform: scale(1.1);
            }

            .custom-badge-wrapper::after {
                content: attr(data-description);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s ease, visibility 0.2s ease;
                pointer-events: none;
            }

            .custom-badge-wrapper:hover::after {
                opacity: 1;
                visibility: visible;
            }
            `
        );

        let customBadgeCSS = '';
        for (const badgeCategory in this.discordBadges) {
            this.discordBadges[badgeCategory].forEach(badge => {
                if (badge.after_icon) {
                    customBadgeCSS += `
                        a[aria-label="${badge.description}"] img {
                            content: url("${badge.after_icon}") !important;
                            width: auto !important;
                            height: 18px !important;
                            object-fit: contain !important;
                        }

                        div [aria-label="${badge.description}"] > a > img {
                            content: url("${badge.after_icon}") !important;
                            width: auto !important;
                            height: 18px !important;
                            object-fit: contain !important;
                        }
                    `;
                }
            });
        }

        DOM.addStyle("CustomBadgeImages", customBadgeCSS);
    }

    patchUserProfiles() {
        const UserProfileModule = BdApi.findModuleByProps("getUserProfile");
    
        if (!UserProfileModule) {
            console.error(`${this.getName()}: UserProfile module not found.`);
            return;
        }
    
        const unpatch = Patcher.after(
            this.getName(),
            UserProfileModule,
            "getUserProfile",
            (_, args, ret) => {
                if (!ret || !ret.userId) return;
    
                const userId = ret.userId;
                const userBadges = this.getUserBadges(userId) || [];
                const allBadges = this.getAllBadges();
                ret.badges = ret.badges.filter(
                    badge => !allBadges.some(b => b.id === badge.id)
                );
                userBadges.forEach(badgeId => {
                    const badge = allBadges.find(b => b.id === badgeId);
                    if (badge) {
                        ret.badges.push({
                            id: badge.id,
                            icon: badge.after_icon || badge.icon,
                            description: badge.description,
                        });
                    }
                });
            }
        );
    
        this.patchedModules.push(unpatch);
    }
    
    
    

    addContextMenuButton() {
        const unpatch = ContextMenu.patch("user-context", (returnValue, props) => {
            const userId = props.user.id;

            const BadgesEditorButton = ContextMenu.buildItem({
                type: "button",
                label: "Edit Badges",
                action: () => this.openBadgesEditorModal(userId),
            });

            const profileSection = returnValue.props.children.find(
                (child) => child?.props?.id === "profile"
            );

            if (profileSection) {
                profileSection.props.children.splice(1, 0, BadgesEditorButton);
            } else {
                returnValue.props.children.unshift(BadgesEditorButton);
            }
        });

        this.patchedModules.push(unpatch);
    }

    openBadgesEditorModal(userId) {
        const user = BdApi.findModuleByProps('getUser').getUser(userId);
        if (!user) {
            BdApi.showToast('User not found', { type: 'error' });
            return;
        }
    
        const currentBadges = [...(this.getUserBadges(userId) || [])];
        this.selectedBadges = [...currentBadges];
    
        const allBadges = [...this.getAllBadges()];
    
        const modalContent = BdApi.React.createElement('div', {
            style: {
                backgroundColor: '#36393f',
                color: '#dcddde',
                padding: '20px',
                borderRadius: '5px'
            }
        },
            BdApi.React.createElement('h2', {
                style: {
                    color: '#ffffff',
                    marginBottom: '15px',
                    fontSize: '24px'
                }
            }, `Editing badges for ${user.username}`),
            BdApi.React.createElement('div', {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                }
            },
                BdApi.React.createElement('button', {
                    onClick: () => this.addAllBadges(allBadges),
                    style: {
                        backgroundColor: '#7289da',
                        color: '#ffffff',
                        padding: '8px 15px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        border: 'none'
                    }
                }, 'Add All Badges'),
                BdApi.React.createElement('button', {
                    onClick: () => this.removeAllBadges(),
                    style: {
                        backgroundColor: '#f04747',
                        color: '#ffffff',
                        padding: '8px 15px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        border: 'none'
                    }
                }, 'Remove All Badges')
            ),
            BdApi.React.createElement('div', {
                style: {
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '10px',
                    backgroundColor: '#2f3136',
                    borderRadius: '3px'
                }
            },
                this.getBadgeCheckboxes(currentBadges, allBadges)
            )
        );
    
        BdApi.showConfirmationModal(
            "Badges Editor",
            modalContent,
            {
                confirmText: "Save",
                cancelText: "Cancel",
                onConfirm: () => {
                    this.saveBadges(userId, this.selectedBadges);
                }
            }
        );
    }
    
    addAllBadges(allBadges) {
        this.selectedBadges = allBadges.map(badge => badge.id);
        this.updateBadgeCheckboxes();
    }
    
    removeAllBadges() {
        this.selectedBadges = [];
        this.updateBadgeCheckboxes();
    }

    updateBadgeCheckboxes() {
        document.querySelectorAll('input[type="checkbox"][data-badge]').forEach(checkbox => {
            const badgeId = checkbox.getAttribute('data-badge');
            checkbox.checked = this.selectedBadges.includes(badgeId);
        });
    }
    
    
    
    
    

    getBadgeCheckboxes(currentBadges, allBadges) {
        return allBadges.map(badge =>
            BdApi.React.createElement('label', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                    cursor: 'pointer',
                    padding: '10px',
                    backgroundColor: '#40444b',
                    borderRadius: '3px',
                    transition: 'background-color 0.2s'
                }
            },
                BdApi.React.createElement('input', {
                    type: 'checkbox',
                    defaultChecked: currentBadges.includes(badge.id),
                    'data-badge': badge.id,
                    onChange: (e) => this.handleBadgeChange(e, badge.id),
                    style: {
                        marginRight: '15px',
                        cursor: 'pointer'
                    }
                }),
                BdApi.React.createElement('img', {
                    src: badge.after_icon || badge.icon,
                    alt: badge.description,
                    style: {
                        width: '24px',
                        height: '24px',
                        marginRight: '15px'
                    }
                }),
                BdApi.React.createElement('span', {
                    style: {
                        fontSize: '14px'
                    }
                }, badge.name)
            )
        );
    }
    
    
    

    handleBadgeChange(event, badgeId) {
        if (event.target.checked) {
            if (!this.selectedBadges.includes(badgeId)) {
                this.selectedBadges.push(badgeId);
            }
        } else {
            const index = this.selectedBadges.indexOf(badgeId);
            if (index > -1) {
                this.selectedBadges.splice(index, 1);
            }
        }
    }
    
    

    saveBadges(userId, newBadges) {
        this.setUserBadges(userId, newBadges);
        this.refreshProfile(userId);
        this.forceUpdateAllUserComponents();
        BdApi.showToast('Badges updated successfully!', { type: 'success' });
    }
    

    

    forceUpdateAllUserComponents() {
        const updateComponent = (component) => {
            if (component && component.forceUpdate) {
                component.forceUpdate();
            }
        };
    
        const traverseTree = (instance) => {
            if (!instance) return;
            updateComponent(instance.stateNode);
            if (instance.child) traverseTree(instance.child);
            if (instance.sibling) traverseTree(instance.sibling);
        };
    
        document.querySelectorAll('*').forEach(node => {
            const instance = BdApi.getInternalInstance(node);
            if (instance) {
                traverseTree(instance);
            }
        });
        this.patchUserProfiles();
    }

    getAllBadges() {
        return [
            ...this.discordBadges.NITRO_BADGES,
            ...this.discordBadges.BOOST_BADGES,
            ...this.discordBadges.STAFF_BADGES,
            ...this.discordBadges.INTERNAL_BADGES,
            ...this.discordBadges.OTHER_BADGES,
            ...this.discordBadges.BOT_BADGES,
            ...this.discordBadges.SERVER_BADGES,
            ...this.discordBadges.GUILD_BADGES,
            ...this.discordBadges.CUSTOM_BADGES,
            ...this.discordBadges.SPECIAL_FLAIRS,
        ];
    }

    getUserBadges(userId) {
        return BdApi.getData("BBDGE-Badges", `badges_${userId}`) || [];
    }

    setUserBadges(userId, badges) {
        if (!Array.isArray(badges)) {
            console.error("Badges must be an array:", badges);
            return;
        }

        BdApi.setData("BBDGE-Badges", `badges_${userId}`, badges);
    }

    refreshProfile(userId) {
        const UserProfileStore = BdApi.findModuleByProps("fetchProfile");
        if (UserProfileStore) {
            UserProfileStore.fetchProfile(userId).then(() => {
                this.updateUserComponents();
                this.patchUserProfiles();
            });
        }
    }

    updateUserComponents() {
        this.forceUpdateAllUserComponents();
    }

    startAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
    
        this.autoRefreshInterval = setInterval(() => {
            this.updateUserComponents();
        }, 30000);
    }
    
};