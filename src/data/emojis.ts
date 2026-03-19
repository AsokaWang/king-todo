export const emojiCategoryOrder = ["smileys_people", "animals_nature", "food_drink", "activities", "travel_places", "objects", "symbols", "flags"] as const

export type EmojiCategoryKey = typeof emojiCategoryOrder[number]

export const emojiCategoryLabels: Record<EmojiCategoryKey, string> = {
  "smileys_people": "表情",
  "animals_nature": "自然",
  "food_drink": "食物",
  "activities": "活动",
  "travel_places": "地点",
  "objects": "物体",
  "symbols": "符号",
  "flags": "旗帜"
}

export type EmojiSeedItem = {
  unified: string
  keywords: string[]
}

export const emojiSeedsByCategory: Record<EmojiCategoryKey, EmojiSeedItem[]> = {
  "smileys_people": [
    {
      "unified": "1f600",
      "keywords": [
        "脸",
        "嘿嘿",
        "笑脸"
      ]
    },
    {
      "unified": "1f603",
      "keywords": [
        "脸",
        "哈哈",
        "笑脸",
        "开口笑"
      ]
    },
    {
      "unified": "1f604",
      "keywords": [
        "笑",
        "脸",
        "大笑",
        "哈哈",
        "开心",
        "高兴"
      ]
    },
    {
      "unified": "1f601",
      "keywords": [
        "脸",
        "嘻嘻",
        "笑脸"
      ]
    },
    {
      "unified": "1f606",
      "keywords": [
        "笑",
        "脸",
        "开心",
        "眯眼",
        "高兴",
        "斜眼笑"
      ]
    },
    {
      "unified": "1f605",
      "keywords": [
        "汗",
        "脸",
        "苦笑",
        "冷汗"
      ]
    },
    {
      "unified": "1f923",
      "keywords": [
        "笑",
        "脸",
        "地板",
        "打滚",
        "笑得满地打滚"
      ]
    },
    {
      "unified": "1f602",
      "keywords": [
        "笑",
        "脸",
        "眼泪",
        "笑哭了"
      ]
    },
    {
      "unified": "1f642",
      "keywords": [
        "笑",
        "脸",
        "呵呵",
        "开心"
      ]
    },
    {
      "unified": "1f643",
      "keywords": [
        "脸",
        "倒脸",
        "颠倒",
        "颠倒的脸"
      ]
    },
    {
      "unified": "1fae0",
      "keywords": [
        "融化",
        "消失",
        "液体",
        "溶解"
      ]
    },
    {
      "unified": "1f609",
      "keywords": [
        "笑",
        "眨眼",
        "媚眼"
      ]
    },
    {
      "unified": "1f60a",
      "keywords": [
        "脸",
        "害羞",
        "微笑",
        "羞涩",
        "脸红",
        "羞涩微笑"
      ]
    },
    {
      "unified": "1f607",
      "keywords": [
        "脸",
        "光环",
        "天使",
        "天真",
        "幻想",
        "微笑",
        "微笑天使"
      ]
    },
    {
      "unified": "1f970",
      "keywords": [
        "心",
        "爱慕",
        "迷恋",
        "喜笑颜开",
        "陷入爱河"
      ]
    },
    {
      "unified": "1f60d",
      "keywords": [
        "爱",
        "脸",
        "花痴",
        "红心"
      ]
    },
    {
      "unified": "1f929",
      "keywords": [
        "脸",
        "咧嘴笑",
        "露齿笑",
        "好崇拜哦"
      ]
    },
    {
      "unified": "1f618",
      "keywords": [
        "脸",
        "飞吻",
        "亲亲",
        "眨眼"
      ]
    },
    {
      "unified": "1f617",
      "keywords": [
        "吻",
        "脸",
        "亲亲"
      ]
    },
    {
      "unified": "263a-fe0f",
      "keywords": [
        "笑",
        "脸",
        "微笑",
        "呵呵",
        "开心",
        "放松"
      ]
    },
    {
      "unified": "1f61a",
      "keywords": [
        "吻",
        "脸",
        "亲亲",
        "羞涩",
        "闭眼",
        "羞涩亲亲"
      ]
    },
    {
      "unified": "1f619",
      "keywords": [
        "吻",
        "脸",
        "亲亲",
        "微笑",
        "微笑亲亲"
      ]
    },
    {
      "unified": "1f972",
      "keywords": [
        "眼泪",
        "微笑的",
        "感动的",
        "感恩的",
        "释怀的",
        "骄傲的",
        "含泪的笑脸"
      ]
    },
    {
      "unified": "1f60b",
      "keywords": [
        "脸",
        "好吃",
        "美味",
        "津津有味"
      ]
    },
    {
      "unified": "1f61b",
      "keywords": [
        "脸",
        "吐舌",
        "舌头",
        "调皮"
      ]
    },
    {
      "unified": "1f61c",
      "keywords": [
        "脸",
        "单眼",
        "吐舌",
        "开玩笑",
        "单眼吐舌"
      ]
    },
    {
      "unified": "1f92a",
      "keywords": [
        "脸",
        "滑稽",
        "大眼",
        "小眼",
        "滑稽的脸",
        "疯狂的脸"
      ]
    },
    {
      "unified": "1f61d",
      "keywords": [
        "脸",
        "可怕",
        "吐舌",
        "眯眼",
        "眼睛",
        "眯眼吐舌"
      ]
    },
    {
      "unified": "1f911",
      "keywords": [
        "脸",
        "钱",
        "发财",
        "拜金",
        "见钱眼开"
      ]
    },
    {
      "unified": "1f917",
      "keywords": [
        "抱",
        "笑",
        "脸",
        "抱抱",
        "拥抱"
      ]
    },
    {
      "unified": "1f92d",
      "keywords": [
        "脸",
        "不说",
        "哎呀"
      ]
    },
    {
      "unified": "1fae2",
      "keywords": [
        "害怕",
        "尴尬",
        "怀疑",
        "惊奇",
        "惊愕",
        "敬畏",
        "睁眼捂嘴"
      ]
    },
    {
      "unified": "1fae3",
      "keywords": [
        "偷看",
        "偷窥",
        "凝视",
        "迷住"
      ]
    },
    {
      "unified": "1f92b",
      "keywords": [
        "嘘",
        "安静",
        "安静的脸"
      ]
    },
    {
      "unified": "1f914",
      "keywords": [
        "想",
        "脸",
        "思考",
        "想一想"
      ]
    },
    {
      "unified": "1fae1",
      "keywords": [
        "好",
        "是",
        "致敬",
        "军队",
        "阳光"
      ]
    },
    {
      "unified": "1f910",
      "keywords": [
        "嘴",
        "脸",
        "闭嘴"
      ]
    },
    {
      "unified": "1f928",
      "keywords": [
        "脸",
        "挑眉",
        "怀疑",
        "不信任",
        "眉毛上挑的脸"
      ]
    },
    {
      "unified": "1f610",
      "keywords": [
        "脸",
        "冷漠",
        "面无表情"
      ]
    },
    {
      "unified": "1f611",
      "keywords": [
        "脸",
        "无语",
        "茫然",
        "面无表情"
      ]
    },
    {
      "unified": "1f636",
      "keywords": [
        "嘴",
        "脸",
        "沉默",
        "安静"
      ]
    },
    {
      "unified": "1fae5",
      "keywords": [
        "内向",
        "沮丧",
        "消失",
        "隐形",
        "隐藏",
        "虚线脸"
      ]
    },
    {
      "unified": "1f636-200d-1f32b-fe0f",
      "keywords": [
        "迷茫"
      ]
    },
    {
      "unified": "1f60f",
      "keywords": [
        "得意",
        "假笑"
      ]
    },
    {
      "unified": "1f612",
      "keywords": [
        "脸",
        "不屑",
        "不服",
        "郁闷",
        "鄙视",
        "不高兴"
      ]
    },
    {
      "unified": "1f644",
      "keywords": [
        "脸",
        "无语",
        "白眼",
        "翻白眼"
      ]
    },
    {
      "unified": "1f62c",
      "keywords": [
        "脸",
        "露齿",
        "鬼脸",
        "龇牙咧嘴",
        "咬牙切齿"
      ]
    },
    {
      "unified": "1f62e-200d-1f4a8",
      "keywords": [
        "呼气",
        "叹息",
        "叹气",
        "释然",
        "呼气的脸",
        "松一口气"
      ]
    },
    {
      "unified": "1f925",
      "keywords": [
        "脸",
        "说谎",
        "匹诺曹",
        "长鼻子"
      ]
    },
    {
      "unified": "1fae8",
      "keywords": [
        "脸",
        "颤抖",
        "地震",
        "震动",
        "震惊"
      ]
    },
    {
      "unified": "1f642-200d-2194-fe0f",
      "keywords": [
        "否定",
        "摇头",
        "左右摇头"
      ]
    },
    {
      "unified": "1f642-200d-2195-fe0f",
      "keywords": [
        "上下点头",
        "点头，肯定"
      ]
    },
    {
      "unified": "1f60c",
      "keywords": [
        "脸",
        "松口气",
        "松了口气",
        "如释重负"
      ]
    },
    {
      "unified": "1f614",
      "keywords": [
        "脸",
        "沉思",
        "心事重重"
      ]
    },
    {
      "unified": "1f62a",
      "keywords": [
        "困",
        "脸",
        "睡觉",
        "瞌睡"
      ]
    },
    {
      "unified": "1f924",
      "keywords": [
        "脸",
        "口水",
        "流口水",
        "垂涎三尺"
      ]
    },
    {
      "unified": "1f634",
      "keywords": [
        "脸",
        "呼噜",
        "打呼",
        "睡着了"
      ]
    },
    {
      "unified": "1f637",
      "keywords": [
        "脸",
        "感冒",
        "医生",
        "口罩",
        "生病"
      ]
    },
    {
      "unified": "1f912",
      "keywords": [
        "脸",
        "发烧",
        "生病",
        "体温计",
        "温度计"
      ]
    },
    {
      "unified": "1f915",
      "keywords": [
        "脸",
        "受伤",
        "打绷带"
      ]
    },
    {
      "unified": "1f922",
      "keywords": [
        "吐",
        "呕",
        "脸",
        "恶心"
      ]
    },
    {
      "unified": "1f92e",
      "keywords": [
        "脸",
        "呕吐",
        "不舒服"
      ]
    },
    {
      "unified": "1f927",
      "keywords": [
        "脸",
        "喷嚏",
        "鼻涕",
        "打喷嚏"
      ]
    },
    {
      "unified": "1f975",
      "keywords": [
        "出汗",
        "发烧",
        "发热",
        "脸红",
        "脸发烧",
        "心狂跳"
      ]
    },
    {
      "unified": "1f976",
      "keywords": [
        "冷",
        "冷脸",
        "冻僵",
        "冷冰冰",
        "满面寒霜"
      ]
    },
    {
      "unified": "1f974",
      "keywords": [
        "微醺",
        "眼花",
        "醉醺醺",
        "头昏眼花",
        "嘴唇颤抖",
        "头晕眼花"
      ]
    },
    {
      "unified": "1f635",
      "keywords": [
        "脸",
        "头晕",
        "晕头",
        "晕头转向",
        "头晕眼花"
      ]
    },
    {
      "unified": "1f635-200d-1f4ab",
      "keywords": [
        "晕"
      ]
    },
    {
      "unified": "1f92f",
      "keywords": [
        "震惊",
        "爆炸头"
      ]
    },
    {
      "unified": "1f920",
      "keywords": [
        "帽",
        "脸",
        "牛仔",
        "牛仔帽脸"
      ]
    },
    {
      "unified": "1f973",
      "keywords": [
        "号角",
        "帽子",
        "庆祝",
        "聚会",
        "聚会笑脸"
      ]
    },
    {
      "unified": "1f978",
      "keywords": [
        "脸",
        "伪装",
        "眼镜",
        "鼻子",
        "伪装的脸",
        "隐瞒身份"
      ]
    },
    {
      "unified": "1f60e",
      "keywords": [
        "酷",
        "墨镜",
        "眼镜",
        "太阳镜",
        "墨镜笑脸"
      ]
    },
    {
      "unified": "1f913",
      "keywords": [
        "脸",
        "奇葩",
        "书呆子脸"
      ]
    },
    {
      "unified": "1f9d0",
      "keywords": [
        "古板",
        "带单片眼镜的脸"
      ]
    },
    {
      "unified": "1f615",
      "keywords": [
        "脸",
        "困扰",
        "不懂",
        "困惑",
        "疑惑"
      ]
    },
    {
      "unified": "1fae4",
      "keywords": [
        "郁闷",
        "失望",
        "怀疑",
        "无聊",
        "不确定"
      ]
    },
    {
      "unified": "1f61f",
      "keywords": [
        "脸",
        "担心",
        "伤心",
        "担忧",
        "焦虑",
        "不高兴"
      ]
    },
    {
      "unified": "1f641",
      "keywords": [
        "脸",
        "委屈",
        "不开心",
        "不高兴",
        "微微不满",
        "心情不好"
      ]
    },
    {
      "unified": "2639-fe0f",
      "keywords": [
        "脸",
        "不满",
        "不爽",
        "皱眉",
        "不高兴"
      ]
    },
    {
      "unified": "1f62e",
      "keywords": [
        "啊",
        "脸",
        "吃惊",
        "同情"
      ]
    },
    {
      "unified": "1f62f",
      "keywords": [
        "脸",
        "缄默",
        "吃惊"
      ]
    },
    {
      "unified": "1f632",
      "keywords": [
        "惊",
        "脸",
        "震惊",
        "惊讶"
      ]
    },
    {
      "unified": "1f633",
      "keywords": [
        "脸",
        "脸红",
        "困惑",
        "害羞",
        "羞涩",
        "茫然",
        "迷茫"
      ]
    },
    {
      "unified": "1f97a",
      "keywords": [
        "怜悯",
        "祈求",
        "恳求的脸",
        "可怜兮兮的眼神"
      ]
    },
    {
      "unified": "1f979",
      "keywords": [
        "哭泣",
        "悲伤",
        "抗拒",
        "生气",
        "自豪",
        "忍住泪水"
      ]
    },
    {
      "unified": "1f626",
      "keywords": [
        "啊",
        "脸",
        "惊讶",
        "目瞪口呆"
      ]
    },
    {
      "unified": "1f627",
      "keywords": [
        "痛",
        "脸",
        "难受",
        "极度痛苦"
      ]
    },
    {
      "unified": "1f628",
      "keywords": [
        "怕",
        "脸",
        "害怕",
        "恐怖",
        "恐惧"
      ]
    },
    {
      "unified": "1f630",
      "keywords": [
        "汗",
        "脸",
        "冷汗",
        "无语",
        "焦虑",
        "紧张"
      ]
    },
    {
      "unified": "1f625",
      "keywords": [
        "脸",
        "失望",
        "如释重负",
        "失望但如释重负"
      ]
    },
    {
      "unified": "1f622",
      "keywords": [
        "哭",
        "泪",
        "脸",
        "伤心"
      ]
    },
    {
      "unified": "1f62d",
      "keywords": [
        "哭",
        "泪",
        "脸",
        "大哭",
        "痛哭",
        "放声大哭"
      ]
    },
    {
      "unified": "1f631",
      "keywords": [
        "脸",
        "吓死",
        "害怕",
        "尖叫",
        "恐怖",
        "吓死了"
      ]
    },
    {
      "unified": "1f616",
      "keywords": [
        "脸",
        "困惑",
        "纠结",
        "焦头烂额"
      ]
    },
    {
      "unified": "1f623",
      "keywords": [
        "脸",
        "痛苦",
        "忍耐",
        "难受"
      ]
    },
    {
      "unified": "1f61e",
      "keywords": [
        "脸",
        "失望",
        "难过",
        "不高兴"
      ]
    },
    {
      "unified": "1f613",
      "keywords": [
        "汗",
        "冷",
        "脸",
        "尴尬"
      ]
    },
    {
      "unified": "1f629",
      "keywords": [
        "累",
        "脸",
        "疲倦",
        "疲劳",
        "疲惫",
        "累死了"
      ]
    },
    {
      "unified": "1f62b",
      "keywords": [
        "累",
        "脸",
        "疲倦",
        "疲劳",
        "疲惫"
      ]
    },
    {
      "unified": "1f971",
      "keywords": [
        "困",
        "累",
        "呵欠",
        "哈欠",
        "无聊",
        "打呵欠"
      ]
    },
    {
      "unified": "1f624",
      "keywords": [
        "赢",
        "傲慢",
        "胜利",
        "自负",
        "趾高气昂"
      ]
    },
    {
      "unified": "1f621",
      "keywords": [
        "怒",
        "脸",
        "发火",
        "发飙",
        "生气",
        "怒火中烧"
      ]
    },
    {
      "unified": "1f620",
      "keywords": [
        "怒",
        "脸",
        "生气",
        "愤怒"
      ]
    },
    {
      "unified": "1f92c",
      "keywords": [
        "脸",
        "发誓",
        "咒骂",
        "嘴上有符号的脸"
      ]
    },
    {
      "unified": "1f608",
      "keywords": [
        "脸",
        "幻想",
        "犄角",
        "恶魔微笑",
        "神话故事"
      ]
    },
    {
      "unified": "1f47f",
      "keywords": [
        "幻想",
        "顽童",
        "生气的恶魔"
      ]
    },
    {
      "unified": "1f480",
      "keywords": [
        "脸",
        "头骨",
        "妖怪",
        "死亡",
        "神话故事"
      ]
    },
    {
      "unified": "2620-fe0f",
      "keywords": [
        "脸",
        "骷髅",
        "头骨",
        "妖怪",
        "死亡",
        "骨头"
      ]
    },
    {
      "unified": "1f4a9",
      "keywords": [
        "屎",
        "脸",
        "大便",
        "怪物",
        "粑粑"
      ]
    },
    {
      "unified": "1f921",
      "keywords": [
        "脸",
        "小丑",
        "小丑脸"
      ]
    },
    {
      "unified": "1f479",
      "keywords": [
        "脸",
        "鬼",
        "妖怪",
        "幻想",
        "食人魔",
        "神话故事"
      ]
    },
    {
      "unified": "1f47a",
      "keywords": [
        "脸",
        "妖怪",
        "幻想",
        "小妖精",
        "神话故事"
      ]
    },
    {
      "unified": "1f47b",
      "keywords": [
        "鬼",
        "脸",
        "妖怪",
        "幻想",
        "幽灵",
        "神话故事"
      ]
    },
    {
      "unified": "1f47d",
      "keywords": [
        "脸",
        "外星",
        "太空",
        "幻想",
        "星际",
        "外星人",
        "ufo"
      ]
    },
    {
      "unified": "1f47e",
      "keywords": [
        "脸",
        "外星",
        "太空",
        "怪物",
        "星际",
        "飞碟",
        "ufo",
        "外星怪物"
      ]
    },
    {
      "unified": "1f916",
      "keywords": [
        "怪物",
        "机器人"
      ]
    },
    {
      "unified": "1f63a",
      "keywords": [
        "笑",
        "脸",
        "哈哈",
        "猫脸",
        "大笑的猫"
      ]
    },
    {
      "unified": "1f638",
      "keywords": [
        "笑",
        "脸",
        "呵呵",
        "猫脸",
        "微笑的猫"
      ]
    },
    {
      "unified": "1f639",
      "keywords": [
        "脸",
        "快乐",
        "猫脸",
        "眼泪",
        "喜极而泣",
        "笑出眼泪的猫"
      ]
    },
    {
      "unified": "1f63b",
      "keywords": [
        "心",
        "脸",
        "喜欢",
        "猫脸",
        "花痴",
        "花痴的猫"
      ]
    },
    {
      "unified": "1f63c",
      "keywords": [
        "脸",
        "奸笑",
        "猫脸",
        "讽刺",
        "奸笑的猫"
      ]
    },
    {
      "unified": "1f63d",
      "keywords": [
        "吻",
        "脸",
        "亲亲",
        "猫脸",
        "亲亲猫"
      ]
    },
    {
      "unified": "1f640",
      "keywords": [
        "累",
        "脸",
        "惊讶",
        "猫脸",
        "疲倦",
        "疲倦的猫"
      ]
    },
    {
      "unified": "1f63f",
      "keywords": [
        "哭",
        "脸",
        "猫脸",
        "眼泪",
        "难过",
        "哭泣的猫"
      ]
    },
    {
      "unified": "1f63e",
      "keywords": [
        "脸",
        "猫脸",
        "生气",
        "生气的猫"
      ]
    },
    {
      "unified": "1f648",
      "keywords": [
        "脸",
        "蒙眼",
        "非礼勿视",
        "蒙住眼睛"
      ]
    },
    {
      "unified": "1f649",
      "keywords": [
        "脸",
        "堵耳",
        "非礼勿听",
        "堵上耳朵"
      ]
    },
    {
      "unified": "1f64a",
      "keywords": [
        "脸",
        "捂嘴",
        "非礼勿言",
        "捂上嘴巴"
      ]
    },
    {
      "unified": "1f48c",
      "keywords": [
        "信",
        "情书",
        "邮件"
      ]
    },
    {
      "unified": "1f498",
      "keywords": [
        "箭",
        "浪漫",
        "爱情",
        "红心",
        "丘比特",
        "心中箭了"
      ]
    },
    {
      "unified": "1f49d",
      "keywords": [
        "爱的礼物",
        "送你一颗心",
        "系有缎带的心"
      ]
    },
    {
      "unified": "1f496",
      "keywords": [
        "激动",
        "红心",
        "闪亮",
        "闪亮的心"
      ]
    },
    {
      "unified": "1f497",
      "keywords": [
        "搏动",
        "激动",
        "紧张",
        "红心",
        "搏动的心"
      ]
    },
    {
      "unified": "1f493",
      "keywords": [
        "爱",
        "心跳",
        "心动"
      ]
    },
    {
      "unified": "1f49e",
      "keywords": [
        "旋转",
        "涌动",
        "跃动",
        "舞动的心"
      ]
    },
    {
      "unified": "1f495",
      "keywords": [
        "爱情",
        "两颗心"
      ]
    },
    {
      "unified": "1f49f",
      "keywords": [
        "装饰",
        "心型装饰"
      ]
    },
    {
      "unified": "2763-fe0f",
      "keywords": [
        "叹号",
        "心动",
        "心叹号"
      ]
    },
    {
      "unified": "1f494",
      "keywords": [
        "心碎",
        "伤心"
      ]
    },
    {
      "unified": "2764-fe0f-200d-1f525",
      "keywords": [
        "爱",
        "渴望",
        "燃烧",
        "火上之心"
      ]
    },
    {
      "unified": "2764-fe0f-200d-1fa79",
      "keywords": [
        "修补",
        "恢复",
        "痊愈",
        "修复受伤的心灵"
      ]
    },
    {
      "unified": "2764-fe0f",
      "keywords": [
        "心",
        "爱",
        "红心"
      ]
    },
    {
      "unified": "1fa77",
      "keywords": [
        "心",
        "爱",
        "可爱",
        "喜欢",
        "粉红",
        "粉红色的心"
      ]
    },
    {
      "unified": "1f9e1",
      "keywords": [
        "橙",
        "橙心"
      ]
    },
    {
      "unified": "1f49b",
      "keywords": [
        "黄",
        "黄心"
      ]
    },
    {
      "unified": "1f49a",
      "keywords": [
        "绿",
        "绿心"
      ]
    },
    {
      "unified": "1f499",
      "keywords": [
        "蓝",
        "蓝心"
      ]
    },
    {
      "unified": "1fa75",
      "keywords": [
        "心",
        "浅蓝",
        "蓝绿",
        "青色",
        "浅蓝色的心"
      ]
    },
    {
      "unified": "1f49c",
      "keywords": [
        "紫",
        "紫心"
      ]
    },
    {
      "unified": "1f90e",
      "keywords": [
        "心",
        "棕",
        "棕心",
        "心形"
      ]
    },
    {
      "unified": "1f5a4",
      "keywords": [
        "心",
        "黑心",
        "邪恶",
        "黑色"
      ]
    },
    {
      "unified": "1fa76",
      "keywords": [
        "心",
        "灰",
        "银",
        "灰心",
        "暗灰"
      ]
    },
    {
      "unified": "1f90d",
      "keywords": [
        "心",
        "白",
        "白心",
        "心形"
      ]
    },
    {
      "unified": "1f48b",
      "keywords": [
        "吻",
        "唇",
        "唇印",
        "浪漫"
      ]
    },
    {
      "unified": "1f4af",
      "keywords": [
        "满分",
        "考试",
        "一百分"
      ]
    },
    {
      "unified": "1f4a2",
      "keywords": [
        "怒",
        "火大",
        "生气",
        "青筋"
      ]
    },
    {
      "unified": "1f4a5",
      "keywords": [
        "炸",
        "爆",
        "爆炸"
      ]
    },
    {
      "unified": "1f4ab",
      "keywords": [
        "头晕",
        "头晕目眩"
      ]
    },
    {
      "unified": "1f4a6",
      "keywords": [
        "汗",
        "汗滴"
      ]
    },
    {
      "unified": "1f4a8",
      "keywords": [
        "尾气",
        "疾驰而去",
        "飞奔而去"
      ]
    },
    {
      "unified": "1f573-fe0f",
      "keywords": [
        "洞",
        "坑",
        "陷阱"
      ]
    },
    {
      "unified": "1f4ac",
      "keywords": [
        "发言",
        "气泡",
        "对话框",
        "话语气泡"
      ]
    },
    {
      "unified": "1f441-fe0f-200d-1f5e8-fe0f",
      "keywords": [
        "眼睛",
        "对话框",
        "眼睛对话框"
      ]
    },
    {
      "unified": "1f5e8-fe0f",
      "keywords": [
        "话语",
        "对话框",
        "朝左的话语气泡"
      ]
    },
    {
      "unified": "1f5ef-fe0f",
      "keywords": [
        "愤怒",
        "对话框",
        "愤怒话语气泡"
      ]
    },
    {
      "unified": "1f4ad",
      "keywords": [
        "气泡",
        "对话框",
        "思想活动",
        "内心活动气泡"
      ]
    },
    {
      "unified": "1f4a4",
      "keywords": [
        "睡着",
        "呼噜",
        "打呼"
      ]
    },
    {
      "unified": "1f44b",
      "keywords": [
        "挥手",
        "你好",
        "再见"
      ]
    },
    {
      "unified": "1f91a",
      "keywords": [
        "手",
        "手背",
        "立起",
        "立起的手背"
      ]
    },
    {
      "unified": "1f590-fe0f",
      "keywords": [
        "布",
        "手",
        "手掌",
        "击掌",
        "禁止"
      ]
    },
    {
      "unified": "270b",
      "keywords": [
        "手",
        "举手",
        "举起手"
      ]
    },
    {
      "unified": "1f596",
      "keywords": [
        "手",
        "敬礼",
        "瓦肯",
        "斯波克",
        "星际迷航",
        "瓦肯举手礼"
      ]
    },
    {
      "unified": "1faf1",
      "keywords": [
        "右",
        "手",
        "向右",
        "向右的手"
      ]
    },
    {
      "unified": "1faf2",
      "keywords": [
        "左",
        "手",
        "向左",
        "向左的手"
      ]
    },
    {
      "unified": "1faf3",
      "keywords": [
        "下投",
        "解散",
        "驱赶",
        "掌心向下的手"
      ]
    },
    {
      "unified": "1faf4",
      "keywords": [
        "召唤",
        "接住",
        "提供",
        "过来",
        "掌心向上的手"
      ]
    },
    {
      "unified": "1faf7",
      "keywords": [
        "推",
        "停止",
        "击掌",
        "向左",
        "拒绝",
        "等等",
        "向左推"
      ]
    },
    {
      "unified": "1faf8",
      "keywords": [
        "推",
        "停止",
        "击掌",
        "向右",
        "拒绝",
        "等等",
        "向右推"
      ]
    },
    {
      "unified": "1f44c",
      "keywords": [
        "手",
        "OK",
        "ok"
      ]
    },
    {
      "unified": "1f90c",
      "keywords": [
        "匮乏",
        "审讯",
        "手势",
        "手指",
        "挖苦",
        "捏手指"
      ]
    },
    {
      "unified": "1f90f",
      "keywords": [
        "小",
        "一点",
        "少量",
        "捏合的手势"
      ]
    },
    {
      "unified": "270c-fe0f",
      "keywords": [
        "v",
        "手",
        "成功",
        "胜利",
        "胜利手势"
      ]
    },
    {
      "unified": "1f91e",
      "keywords": [
        "手",
        "交叉",
        "幸运",
        "手指",
        "交叉的手指"
      ]
    },
    {
      "unified": "1faf0",
      "keywords": [
        "心",
        "爱",
        "响指",
        "昂贵",
        "金钱",
        "食指与拇指交叉的手"
      ]
    },
    {
      "unified": "1f91f",
      "keywords": [
        "手",
        "我爱你",
        "爱你的手势"
      ]
    },
    {
      "unified": "1f918",
      "keywords": [
        "手",
        "角",
        "摇滚",
        "金属礼"
      ]
    },
    {
      "unified": "1f919",
      "keywords": [
        "手",
        "电话",
        "给我打电话"
      ]
    },
    {
      "unified": "1f448",
      "keywords": [
        "手",
        "反手",
        "指左",
        "食指",
        "向左指",
        "反手食指向左指"
      ]
    },
    {
      "unified": "1f449",
      "keywords": [
        "手",
        "反手",
        "指右",
        "食指",
        "向右指",
        "反手食指向右指"
      ]
    },
    {
      "unified": "1f446",
      "keywords": [
        "手",
        "反手",
        "指上",
        "食指",
        "向上指",
        "反手食指向上指"
      ]
    },
    {
      "unified": "1f595",
      "keywords": [
        "手",
        "中指",
        "反手",
        "竖中指"
      ]
    },
    {
      "unified": "1f447",
      "keywords": [
        "手",
        "反手",
        "指下",
        "食指",
        "向下指",
        "反手食指向下指"
      ]
    },
    {
      "unified": "261d-fe0f",
      "keywords": [
        "手",
        "指上",
        "食指",
        "向上指",
        "食指向上指"
      ]
    },
    {
      "unified": "1faf5",
      "keywords": [
        "你",
        "指向",
        "指向观察者的食指"
      ]
    },
    {
      "unified": "1f44d",
      "keywords": [
        "手",
        "同意",
        "真棒",
        "赞成",
        "顶一下",
        "拇指向上"
      ]
    },
    {
      "unified": "1f44e",
      "keywords": [
        "手",
        "反对",
        "责备",
        "不赞成",
        "拇指向下"
      ]
    },
    {
      "unified": "270a",
      "keywords": [
        "手",
        "拳头",
        "握拳",
        "举起拳头"
      ]
    },
    {
      "unified": "1f44a",
      "keywords": [
        "手",
        "打",
        "拳",
        "出拳"
      ]
    },
    {
      "unified": "1f91b",
      "keywords": [
        "拳头",
        "朝左",
        "朝左的拳头"
      ]
    },
    {
      "unified": "1f91c",
      "keywords": [
        "手",
        "拳头",
        "朝右",
        "朝右的拳头"
      ]
    },
    {
      "unified": "1f44f",
      "keywords": [
        "鼓掌",
        "拍手"
      ]
    },
    {
      "unified": "1f64c",
      "keywords": [
        "击掌",
        "双手",
        "庆祝",
        "举双手"
      ]
    },
    {
      "unified": "1faf6",
      "keywords": [
        "爱",
        "做成心形的双手"
      ]
    },
    {
      "unified": "1f450",
      "keywords": [
        "双手",
        "摊手",
        "张开双手"
      ]
    },
    {
      "unified": "1f932",
      "keywords": [
        "祷告",
        "掌心向上托起"
      ]
    },
    {
      "unified": "1f91d",
      "keywords": [
        "握手",
        "会面",
        "协议"
      ]
    },
    {
      "unified": "1f64f",
      "keywords": [
        "拜托",
        "祈求",
        "祈祷",
        "祝福",
        "双手合十"
      ]
    },
    {
      "unified": "270d-fe0f",
      "keywords": [
        "写",
        "笔",
        "写字"
      ]
    },
    {
      "unified": "1f485",
      "keywords": [
        "美甲",
        "指甲油",
        "涂指甲油"
      ]
    },
    {
      "unified": "1f933",
      "keywords": [
        "自拍",
        "手机",
        "相机"
      ]
    },
    {
      "unified": "1f4aa",
      "keywords": [
        "肌肉",
        "强壮",
        "二头肌"
      ]
    },
    {
      "unified": "1f9be",
      "keywords": [
        "义肢",
        "手臂",
        "无障碍",
        "机械手臂"
      ]
    },
    {
      "unified": "1f9bf",
      "keywords": [
        "腿",
        "义肢",
        "机械腿",
        "无障碍"
      ]
    },
    {
      "unified": "1f9b5",
      "keywords": [
        "腿",
        "踢",
        "跛行"
      ]
    },
    {
      "unified": "1f9b6",
      "keywords": [
        "脚",
        "踢",
        "踩"
      ]
    },
    {
      "unified": "1f442",
      "keywords": [
        "听",
        "耳",
        "耳朵"
      ]
    },
    {
      "unified": "1f9bb",
      "keywords": [
        "聋",
        "失聪",
        "助听器",
        "无障碍",
        "听力障碍",
        "戴助听器的耳朵"
      ]
    },
    {
      "unified": "1f443",
      "keywords": [
        "嗅",
        "闻",
        "鼻",
        "鼻子"
      ]
    },
    {
      "unified": "1f9e0",
      "keywords": [
        "脑",
        "大脑",
        "头脑",
        "智慧",
        "智能"
      ]
    },
    {
      "unified": "1fac0",
      "keywords": [
        "中心",
        "器官",
        "心率",
        "心跳",
        "心脏器官",
        "心脏病学"
      ]
    },
    {
      "unified": "1fac1",
      "keywords": [
        "肺",
        "吸气",
        "呼吸",
        "呼气",
        "器官",
        "呼吸作用"
      ]
    },
    {
      "unified": "1f9b7",
      "keywords": [
        "牙齿",
        "牙医"
      ]
    },
    {
      "unified": "1f9b4",
      "keywords": [
        "骨头",
        "骨骼"
      ]
    },
    {
      "unified": "1f440",
      "keywords": [
        "双眼"
      ]
    },
    {
      "unified": "1f441-fe0f",
      "keywords": [
        "看",
        "眼",
        "眼睛"
      ]
    },
    {
      "unified": "1f445",
      "keywords": [
        "舌",
        "舔",
        "舌头"
      ]
    },
    {
      "unified": "1f444",
      "keywords": [
        "嘴",
        "口",
        "唇"
      ]
    },
    {
      "unified": "1fae6",
      "keywords": [
        "害怕",
        "担心",
        "焦虑",
        "紧张",
        "调情",
        "不舒服",
        "咬住嘴唇"
      ]
    },
    {
      "unified": "1f476",
      "keywords": [
        "宝宝",
        "小宝贝"
      ]
    },
    {
      "unified": "1f9d2",
      "keywords": [
        "儿童",
        "年轻人",
        "性别不明",
        "性别中立"
      ]
    },
    {
      "unified": "1f466",
      "keywords": [
        "男孩",
        "儿童"
      ]
    },
    {
      "unified": "1f467",
      "keywords": [
        "女孩",
        "儿童"
      ]
    },
    {
      "unified": "1f9d1",
      "keywords": [
        "成人",
        "性别中立",
        "性格不明"
      ]
    },
    {
      "unified": "1f471",
      "keywords": [
        "金发",
        "金色头发的人"
      ]
    },
    {
      "unified": "1f468",
      "keywords": [
        "男人",
        "成人"
      ]
    },
    {
      "unified": "1f9d4",
      "keywords": [
        "人",
        "男",
        "胡子",
        "胡须",
        "络腮胡",
        "有胡子的人"
      ]
    },
    {
      "unified": "1f9d4-200d-2642-fe0f",
      "keywords": [
        "男人",
        "胡子",
        "有络腮胡子的男人"
      ]
    },
    {
      "unified": "1f9d4-200d-2640-fe0f",
      "keywords": [
        "女人",
        "胡子",
        "有络腮胡子的女人"
      ]
    },
    {
      "unified": "1f468-200d-1f9b0",
      "keywords": [
        "成人",
        "男人",
        "红发",
        "男人: 红发"
      ]
    },
    {
      "unified": "1f468-200d-1f9b1",
      "keywords": [
        "卷发",
        "成人",
        "男人",
        "男人: 卷发"
      ]
    },
    {
      "unified": "1f468-200d-1f9b3",
      "keywords": [
        "成人",
        "男人",
        "白发",
        "男人: 白发"
      ]
    },
    {
      "unified": "1f468-200d-1f9b2",
      "keywords": [
        "成人",
        "男人",
        "秃顶",
        "男人: 秃顶"
      ]
    },
    {
      "unified": "1f469",
      "keywords": [
        "女",
        "女人"
      ]
    },
    {
      "unified": "1f469-200d-1f9b0",
      "keywords": [
        "女",
        "女人",
        "红发",
        "女人: 红发"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9b0",
      "keywords": [
        "成人",
        "红发",
        "性别中立",
        "性格不明",
        "成人: 红发"
      ]
    },
    {
      "unified": "1f469-200d-1f9b1",
      "keywords": [
        "女",
        "卷发",
        "女人",
        "女人: 卷发"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9b1",
      "keywords": [
        "卷发",
        "成人",
        "性别中立",
        "性格不明",
        "成人: 卷发"
      ]
    },
    {
      "unified": "1f469-200d-1f9b3",
      "keywords": [
        "女",
        "女人",
        "白发",
        "女人: 白发"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9b3",
      "keywords": [
        "成人",
        "白发",
        "性别中立",
        "性格不明",
        "成人: 白发"
      ]
    },
    {
      "unified": "1f469-200d-1f9b2",
      "keywords": [
        "女",
        "女人",
        "秃顶",
        "女人: 秃顶"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9b2",
      "keywords": [
        "成人",
        "秃顶",
        "性别中立",
        "性格不明",
        "成人: 秃顶"
      ]
    },
    {
      "unified": "1f471-200d-2640-fe0f",
      "keywords": [
        "女",
        "金发",
        "金发女"
      ]
    },
    {
      "unified": "1f471-200d-2642-fe0f",
      "keywords": [
        "男",
        "金发",
        "金发男"
      ]
    },
    {
      "unified": "1f9d3",
      "keywords": [
        "成人",
        "老人",
        "老年人",
        "性别不明",
        "性别中性"
      ]
    },
    {
      "unified": "1f474",
      "keywords": [
        "老人",
        "老头",
        "老爷爷"
      ]
    },
    {
      "unified": "1f475",
      "keywords": [
        "老人",
        "老太",
        "老奶奶"
      ]
    },
    {
      "unified": "1f64d",
      "keywords": [
        "皱眉",
        "不开心"
      ]
    },
    {
      "unified": "1f64d-200d-2642-fe0f",
      "keywords": [
        "男",
        "皱眉",
        "皱眉男",
        "不开心"
      ]
    },
    {
      "unified": "1f64d-200d-2640-fe0f",
      "keywords": [
        "女",
        "皱眉",
        "皱眉女",
        "不开心"
      ]
    },
    {
      "unified": "1f64e",
      "keywords": [
        "撅嘴",
        "噘嘴",
        "不开心"
      ]
    },
    {
      "unified": "1f64e-200d-2642-fe0f",
      "keywords": [
        "男",
        "噘嘴",
        "撅嘴男",
        "不开心"
      ]
    },
    {
      "unified": "1f64e-200d-2640-fe0f",
      "keywords": [
        "女",
        "噘嘴",
        "撅嘴女",
        "不开心"
      ]
    },
    {
      "unified": "1f645",
      "keywords": [
        "不行",
        "反对",
        "禁止",
        "禁止手势"
      ]
    },
    {
      "unified": "1f645-200d-2642-fe0f",
      "keywords": [
        "男",
        "不行",
        "反对",
        "禁止",
        "禁止手势男"
      ]
    },
    {
      "unified": "1f645-200d-2640-fe0f",
      "keywords": [
        "女",
        "不行",
        "反对",
        "禁止",
        "禁止手势女"
      ]
    },
    {
      "unified": "1f646",
      "keywords": [
        "ok",
        "好的",
        "OK手势",
        "ok手势"
      ]
    },
    {
      "unified": "1f646-200d-2642-fe0f",
      "keywords": [
        "男",
        "ok",
        "可以",
        "同意",
        "好的",
        "OK手势男",
        "ok手势男"
      ]
    },
    {
      "unified": "1f646-200d-2640-fe0f",
      "keywords": [
        "女",
        "ok",
        "可以",
        "同意",
        "好的",
        "OK手势女",
        "ok手势女"
      ]
    },
    {
      "unified": "1f481",
      "keywords": [
        "前台",
        "信息",
        "帮助"
      ]
    },
    {
      "unified": "1f481-200d-2642-fe0f",
      "keywords": [
        "男",
        "前台",
        "前台男"
      ]
    },
    {
      "unified": "1f481-200d-2640-fe0f",
      "keywords": [
        "女",
        "前台",
        "前台女"
      ]
    },
    {
      "unified": "1f64b",
      "keywords": [
        "举手",
        "开心"
      ]
    },
    {
      "unified": "1f64b-200d-2642-fe0f",
      "keywords": [
        "男",
        "举手",
        "男生举手"
      ]
    },
    {
      "unified": "1f64b-200d-2640-fe0f",
      "keywords": [
        "女",
        "举手",
        "女生举手"
      ]
    },
    {
      "unified": "1f9cf",
      "keywords": [
        "聋",
        "听力",
        "耳朵",
        "失聪者",
        "无障碍"
      ]
    },
    {
      "unified": "1f9cf-200d-2642-fe0f",
      "keywords": [
        "男",
        "聋",
        "耳朵",
        "听力障碍",
        "失聪的男人"
      ]
    },
    {
      "unified": "1f9cf-200d-2640-fe0f",
      "keywords": [
        "女",
        "聋",
        "耳朵",
        "听力障碍",
        "失聪的女人"
      ]
    },
    {
      "unified": "1f647",
      "keywords": [
        "鞠躬",
        "道歉",
        "对不起",
        "不好意思"
      ]
    },
    {
      "unified": "1f647-200d-2642-fe0f",
      "keywords": [
        "男",
        "道歉",
        "对不起",
        "男生鞠躬",
        "不好意思"
      ]
    },
    {
      "unified": "1f647-200d-2640-fe0f",
      "keywords": [
        "女",
        "道歉",
        "对不起",
        "女生鞠躬",
        "不好意思"
      ]
    },
    {
      "unified": "1f926",
      "keywords": [
        "捂脸",
        "无语",
        "难以置信"
      ]
    },
    {
      "unified": "1f926-200d-2642-fe0f",
      "keywords": [
        "男",
        "无语",
        "男生捂脸",
        "难以置信"
      ]
    },
    {
      "unified": "1f926-200d-2640-fe0f",
      "keywords": [
        "女",
        "无语",
        "女生捂脸",
        "难以置信"
      ]
    },
    {
      "unified": "1f937",
      "keywords": [
        "耸肩",
        "怀疑",
        "无视",
        "不关心"
      ]
    },
    {
      "unified": "1f937-200d-2642-fe0f",
      "keywords": [
        "男",
        "怀疑",
        "无视",
        "不关心",
        "男生耸肩"
      ]
    },
    {
      "unified": "1f937-200d-2640-fe0f",
      "keywords": [
        "女",
        "怀疑",
        "无视",
        "不关心",
        "女生耸肩"
      ]
    },
    {
      "unified": "1f9d1-200d-2695-fe0f",
      "keywords": [
        "医生",
        "护士",
        "治疗师",
        "卫生工作者"
      ]
    },
    {
      "unified": "1f468-200d-2695-fe0f",
      "keywords": [
        "医生",
        "护士",
        "男人",
        "男医生",
        "治疗师",
        "医护人员"
      ]
    },
    {
      "unified": "1f469-200d-2695-fe0f",
      "keywords": [
        "医生",
        "女人",
        "护士",
        "女医生",
        "治疗师",
        "医护人员"
      ]
    },
    {
      "unified": "1f9d1-200d-1f393",
      "keywords": [
        "学生",
        "毕业",
        "毕业生"
      ]
    },
    {
      "unified": "1f468-200d-1f393",
      "keywords": [
        "男",
        "学生",
        "毕业",
        "男学生"
      ]
    },
    {
      "unified": "1f469-200d-1f393",
      "keywords": [
        "女",
        "学生",
        "毕业",
        "女学生"
      ]
    },
    {
      "unified": "1f9d1-200d-1f3eb",
      "keywords": [
        "老师",
        "教师",
        "教授"
      ]
    },
    {
      "unified": "1f468-200d-1f3eb",
      "keywords": [
        "男",
        "教师",
        "教授",
        "老师",
        "男老师"
      ]
    },
    {
      "unified": "1f469-200d-1f3eb",
      "keywords": [
        "女",
        "教师",
        "教授",
        "老师",
        "女老师"
      ]
    },
    {
      "unified": "1f9d1-200d-2696-fe0f",
      "keywords": [
        "法官",
        "法律"
      ]
    },
    {
      "unified": "1f468-200d-2696-fe0f",
      "keywords": [
        "男",
        "正义",
        "法官",
        "法律",
        "男法官"
      ]
    },
    {
      "unified": "1f469-200d-2696-fe0f",
      "keywords": [
        "女",
        "正义",
        "法官",
        "法律",
        "女法官"
      ]
    },
    {
      "unified": "1f9d1-200d-1f33e",
      "keywords": [
        "农民",
        "园丁"
      ]
    },
    {
      "unified": "1f468-200d-1f33e",
      "keywords": [
        "男",
        "农夫",
        "农民",
        "园丁"
      ]
    },
    {
      "unified": "1f469-200d-1f33e",
      "keywords": [
        "女",
        "农妇",
        "农民",
        "园丁"
      ]
    },
    {
      "unified": "1f9d1-200d-1f373",
      "keywords": [
        "厨师",
        "做饭",
        "大厨"
      ]
    },
    {
      "unified": "1f468-200d-1f373",
      "keywords": [
        "男",
        "做饭",
        "厨师",
        "大厨",
        "男厨师"
      ]
    },
    {
      "unified": "1f469-200d-1f373",
      "keywords": [
        "女",
        "做饭",
        "厨师",
        "大厨",
        "女厨师"
      ]
    },
    {
      "unified": "1f9d1-200d-1f527",
      "keywords": [
        "技工",
        "电工",
        "水管工"
      ]
    },
    {
      "unified": "1f468-200d-1f527",
      "keywords": [
        "男",
        "技工",
        "电工",
        "男技工",
        "水管工"
      ]
    },
    {
      "unified": "1f469-200d-1f527",
      "keywords": [
        "女",
        "技工",
        "电工",
        "女技工",
        "水管工"
      ]
    },
    {
      "unified": "1f9d1-200d-1f3ed",
      "keywords": [
        "工人",
        "工业",
        "工厂",
        "装配"
      ]
    },
    {
      "unified": "1f468-200d-1f3ed",
      "keywords": [
        "工业",
        "工厂",
        "装配",
        "男工人"
      ]
    },
    {
      "unified": "1f469-200d-1f3ed",
      "keywords": [
        "工业",
        "工厂",
        "装配",
        "女工人"
      ]
    },
    {
      "unified": "1f9d1-200d-1f4bc",
      "keywords": [
        "白领",
        "商人",
        "经理",
        "建筑师"
      ]
    },
    {
      "unified": "1f468-200d-1f4bc",
      "keywords": [
        "商人",
        "经理",
        "男白领",
        "建筑师"
      ]
    },
    {
      "unified": "1f469-200d-1f4bc",
      "keywords": [
        "商人",
        "经理",
        "女白领",
        "建筑师"
      ]
    },
    {
      "unified": "1f9d1-200d-1f52c",
      "keywords": [
        "科学家",
        "化学家",
        "工程学家",
        "物理学家",
        "生物学家"
      ]
    },
    {
      "unified": "1f468-200d-1f52c",
      "keywords": [
        "男",
        "化学家",
        "科学家",
        "男科学家",
        "工程学家",
        "物理学家",
        "生物学家"
      ]
    },
    {
      "unified": "1f469-200d-1f52c",
      "keywords": [
        "女",
        "化学家",
        "科学家",
        "女科学家",
        "工程学家",
        "物理学家",
        "生物学家"
      ]
    },
    {
      "unified": "1f9d1-200d-1f4bb",
      "keywords": [
        "发明",
        "码农",
        "软件",
        "程序员",
        "开发人员"
      ]
    },
    {
      "unified": "1f468-200d-1f4bb",
      "keywords": [
        "男",
        "码农",
        "软件",
        "发明家",
        "程序员",
        "男程序员",
        "开发人员"
      ]
    },
    {
      "unified": "1f469-200d-1f4bb",
      "keywords": [
        "女",
        "码农",
        "软件",
        "发明家",
        "程序员",
        "女程序员",
        "开发人员"
      ]
    },
    {
      "unified": "1f9d1-200d-1f3a4",
      "keywords": [
        "歌手",
        "明星",
        "演员",
        "艺人",
        "摇滚歌手"
      ]
    },
    {
      "unified": "1f468-200d-1f3a4",
      "keywords": [
        "男",
        "明星",
        "艺人",
        "男歌手",
        "男演员",
        "摇滚歌手"
      ]
    },
    {
      "unified": "1f469-200d-1f3a4",
      "keywords": [
        "女",
        "明星",
        "演员",
        "艺人",
        "女歌手",
        "摇滚歌手"
      ]
    },
    {
      "unified": "1f9d1-200d-1f3a8",
      "keywords": [
        "画家",
        "艺术家"
      ]
    },
    {
      "unified": "1f468-200d-1f3a8",
      "keywords": [
        "男",
        "画家",
        "男艺术家"
      ]
    },
    {
      "unified": "1f469-200d-1f3a8",
      "keywords": [
        "女",
        "画家",
        "女艺术家"
      ]
    },
    {
      "unified": "1f9d1-200d-2708-fe0f",
      "keywords": [
        "飞机",
        "飞行员"
      ]
    },
    {
      "unified": "1f468-200d-2708-fe0f",
      "keywords": [
        "男",
        "飞机",
        "男飞行员"
      ]
    },
    {
      "unified": "1f469-200d-2708-fe0f",
      "keywords": [
        "女",
        "飞机",
        "女飞行员"
      ]
    },
    {
      "unified": "1f9d1-200d-1f680",
      "keywords": [
        "火箭",
        "宇航员"
      ]
    },
    {
      "unified": "1f468-200d-1f680",
      "keywords": [
        "男",
        "火箭",
        "宇航员",
        "男宇航员"
      ]
    },
    {
      "unified": "1f469-200d-1f680",
      "keywords": [
        "女",
        "火箭",
        "宇航员",
        "女宇航员"
      ]
    },
    {
      "unified": "1f9d1-200d-1f692",
      "keywords": [
        "消防员",
        "消防车"
      ]
    },
    {
      "unified": "1f468-200d-1f692",
      "keywords": [
        "男",
        "消防员",
        "消防车",
        "男消防员"
      ]
    },
    {
      "unified": "1f469-200d-1f692",
      "keywords": [
        "女",
        "消防员",
        "消防车",
        "女消防员"
      ]
    },
    {
      "unified": "1f46e",
      "keywords": [
        "警察",
        "警官"
      ]
    },
    {
      "unified": "1f46e-200d-2642-fe0f",
      "keywords": [
        "男",
        "警官",
        "警察",
        "男警察"
      ]
    },
    {
      "unified": "1f46e-200d-2640-fe0f",
      "keywords": [
        "女",
        "警官",
        "警察",
        "女警察"
      ]
    },
    {
      "unified": "1f575-fe0f",
      "keywords": [
        "侦探",
        "间谍"
      ]
    },
    {
      "unified": "1f575-fe0f-200d-2642-fe0f",
      "keywords": [
        "男",
        "侦探",
        "间谍",
        "男侦探"
      ]
    },
    {
      "unified": "1f575-fe0f-200d-2640-fe0f",
      "keywords": [
        "女",
        "侦探",
        "间谍",
        "女侦探"
      ]
    },
    {
      "unified": "1f482",
      "keywords": [
        "卫兵",
        "卫士",
        "守卫"
      ]
    },
    {
      "unified": "1f482-200d-2642-fe0f",
      "keywords": [
        "男",
        "卫兵",
        "卫士",
        "守卫",
        "男卫兵"
      ]
    },
    {
      "unified": "1f482-200d-2640-fe0f",
      "keywords": [
        "女",
        "卫兵",
        "卫士",
        "守卫",
        "女卫兵"
      ]
    },
    {
      "unified": "1f977",
      "keywords": [
        "忍者",
        "打斗",
        "隐藏",
        "隐身"
      ]
    },
    {
      "unified": "1f477",
      "keywords": [
        "工人",
        "建筑",
        "建筑工人"
      ]
    },
    {
      "unified": "1f477-200d-2642-fe0f",
      "keywords": [
        "男",
        "工人",
        "建筑",
        "男建筑工人"
      ]
    },
    {
      "unified": "1f477-200d-2640-fe0f",
      "keywords": [
        "女",
        "工人",
        "建筑",
        "女建筑工人"
      ]
    },
    {
      "unified": "1fac5",
      "keywords": [
        "君主",
        "君威",
        "王室",
        "贵族",
        "戴王冠的人"
      ]
    },
    {
      "unified": "1f934",
      "keywords": [
        "王子"
      ]
    },
    {
      "unified": "1f478",
      "keywords": [
        "公主",
        "皇冠",
        "童话"
      ]
    },
    {
      "unified": "1f473",
      "keywords": [
        "头巾",
        "戴头巾的人"
      ]
    },
    {
      "unified": "1f473-200d-2642-fe0f",
      "keywords": [
        "男",
        "头巾",
        "戴头巾的男人"
      ]
    },
    {
      "unified": "1f473-200d-2640-fe0f",
      "keywords": [
        "女",
        "头巾",
        "戴头巾的女人"
      ]
    },
    {
      "unified": "1f472",
      "keywords": [
        "帽子",
        "瓜皮帽",
        "戴瓜皮帽的人"
      ]
    },
    {
      "unified": "1f9d5",
      "keywords": [
        "头巾",
        "希贾布",
        "带头饰的女人"
      ]
    },
    {
      "unified": "1f935",
      "keywords": [
        "人",
        "新郎",
        "燕尾服",
        "穿燕尾服的人"
      ]
    },
    {
      "unified": "1f935-200d-2642-fe0f",
      "keywords": [
        "男人",
        "礼服",
        "穿礼服的男人"
      ]
    },
    {
      "unified": "1f935-200d-2640-fe0f",
      "keywords": [
        "女人",
        "礼服",
        "穿礼服的女人"
      ]
    },
    {
      "unified": "1f470",
      "keywords": [
        "人",
        "头纱",
        "婚礼",
        "新娘",
        "戴头纱的人"
      ]
    },
    {
      "unified": "1f470-200d-2642-fe0f",
      "keywords": [
        "头纱",
        "男人",
        "戴头纱的男人"
      ]
    },
    {
      "unified": "1f470-200d-2640-fe0f",
      "keywords": [
        "头纱",
        "女人",
        "戴头纱的女人"
      ]
    },
    {
      "unified": "1f930",
      "keywords": [
        "孕妇",
        "女人",
        "怀孕"
      ]
    },
    {
      "unified": "1fac3",
      "keywords": [
        "充满",
        "怀孕",
        "腹部",
        "臃肿",
        "怀孕的男人"
      ]
    },
    {
      "unified": "1fac4",
      "keywords": [
        "充满",
        "怀孕",
        "腹部",
        "臃肿",
        "怀孕的人"
      ]
    },
    {
      "unified": "1f931",
      "keywords": [
        "乳房",
        "哺乳",
        "婴儿",
        "母乳喂养"
      ]
    },
    {
      "unified": "1f469-200d-1f37c",
      "keywords": [
        "哺乳",
        "喂养",
        "女人",
        "婴儿",
        "哺乳的女人"
      ]
    },
    {
      "unified": "1f468-200d-1f37c",
      "keywords": [
        "哺乳",
        "喂养",
        "婴儿",
        "男人",
        "哺乳的男人"
      ]
    },
    {
      "unified": "1f9d1-200d-1f37c",
      "keywords": [
        "人",
        "哺乳",
        "喂养",
        "婴儿",
        "哺乳的人"
      ]
    },
    {
      "unified": "1f47c",
      "keywords": [
        "儿童",
        "天使",
        "孩子",
        "小天使"
      ]
    },
    {
      "unified": "1f385",
      "keywords": [
        "圣诞",
        "节日",
        "圣诞老人"
      ]
    },
    {
      "unified": "1f936",
      "keywords": [
        "圣诞",
        "奶奶",
        "老妈",
        "圣诞奶奶"
      ]
    },
    {
      "unified": "1f9d1-200d-1f384",
      "keywords": [
        "人",
        "圣诞",
        "圣诞人"
      ]
    },
    {
      "unified": "1f9b8",
      "keywords": [
        "好人",
        "英雄",
        "女英雄",
        "超能力",
        "超级英雄"
      ]
    },
    {
      "unified": "1f9b8-200d-2642-fe0f",
      "keywords": [
        "好人",
        "男人",
        "英雄",
        "超能力",
        "男超级英雄"
      ]
    },
    {
      "unified": "1f9b8-200d-2640-fe0f",
      "keywords": [
        "女人",
        "好人",
        "英雄",
        "超能力",
        "女超级英雄"
      ]
    },
    {
      "unified": "1f9b9",
      "keywords": [
        "坏蛋",
        "恶魔",
        "罪犯",
        "超能力",
        "超级大坏蛋"
      ]
    },
    {
      "unified": "1f9b9-200d-2642-fe0f",
      "keywords": [
        "坏蛋",
        "男人",
        "罪犯",
        "超能力",
        "男超级大坏蛋"
      ]
    },
    {
      "unified": "1f9b9-200d-2640-fe0f",
      "keywords": [
        "坏蛋",
        "女人",
        "罪犯",
        "超能力",
        "女超级大坏蛋"
      ]
    },
    {
      "unified": "1f9d9",
      "keywords": [
        "法师",
        "女巫",
        "男巫",
        "女魔术师",
        "男魔术师"
      ]
    },
    {
      "unified": "1f9d9-200d-2642-fe0f",
      "keywords": [
        "男巫",
        "男法师",
        "男魔术师"
      ]
    },
    {
      "unified": "1f9d9-200d-2640-fe0f",
      "keywords": [
        "女巫",
        "女法师",
        "女魔术师"
      ]
    },
    {
      "unified": "1f9da",
      "keywords": [
        "精灵",
        "天卫三",
        "天卫四",
        "天卫十五"
      ]
    },
    {
      "unified": "1f9da-200d-2642-fe0f",
      "keywords": [
        "仙人",
        "仙男",
        "天卫四",
        "男精灵",
        "天卫十五"
      ]
    },
    {
      "unified": "1f9da-200d-2640-fe0f",
      "keywords": [
        "仙女",
        "女精灵",
        "妖精王后"
      ]
    },
    {
      "unified": "1f9db",
      "keywords": [
        "吸血鬼",
        "不死族"
      ]
    },
    {
      "unified": "1f9db-200d-2642-fe0f",
      "keywords": [
        "男吸血鬼",
        "男不死族"
      ]
    },
    {
      "unified": "1f9db-200d-2640-fe0f",
      "keywords": [
        "女吸血鬼",
        "女不死族"
      ]
    },
    {
      "unified": "1f9dc",
      "keywords": [
        "人鱼",
        "女人鱼",
        "男人鱼",
        "美人鱼"
      ]
    },
    {
      "unified": "1f9dc-200d-2642-fe0f",
      "keywords": [
        "男人鱼",
        "特里同"
      ]
    },
    {
      "unified": "1f9dc-200d-2640-fe0f",
      "keywords": [
        "美人鱼",
        "女人鱼"
      ]
    },
    {
      "unified": "1f9dd",
      "keywords": [
        "魔术",
        "小精灵"
      ]
    },
    {
      "unified": "1f9dd-200d-2642-fe0f",
      "keywords": [
        "男小精灵",
        "男性魔术"
      ]
    },
    {
      "unified": "1f9dd-200d-2640-fe0f",
      "keywords": [
        "女小精灵",
        "女性魔术"
      ]
    },
    {
      "unified": "1f9de",
      "keywords": [
        "妖怪",
        "神灵"
      ]
    },
    {
      "unified": "1f9de-200d-2642-fe0f",
      "keywords": [
        "男妖怪",
        "男神灵"
      ]
    },
    {
      "unified": "1f9de-200d-2640-fe0f",
      "keywords": [
        "女妖怪",
        "女神灵"
      ]
    },
    {
      "unified": "1f9df",
      "keywords": [
        "僵尸",
        "不死族",
        "行尸走肉"
      ]
    },
    {
      "unified": "1f9df-200d-2642-fe0f",
      "keywords": [
        "男僵尸",
        "男行尸走肉"
      ]
    },
    {
      "unified": "1f9df-200d-2640-fe0f",
      "keywords": [
        "女僵尸",
        "女行尸走肉"
      ]
    },
    {
      "unified": "1f9cc",
      "keywords": [
        "幻想",
        "怪物",
        "穴居巨怪",
        "神话故事"
      ]
    },
    {
      "unified": "1f486",
      "keywords": [
        "按摩",
        "美容"
      ]
    },
    {
      "unified": "1f486-200d-2642-fe0f",
      "keywords": [
        "男",
        "按摩",
        "男生按摩"
      ]
    },
    {
      "unified": "1f486-200d-2640-fe0f",
      "keywords": [
        "女",
        "按摩",
        "女生按摩"
      ]
    },
    {
      "unified": "1f487",
      "keywords": [
        "理发",
        "剪头"
      ]
    },
    {
      "unified": "1f487-200d-2642-fe0f",
      "keywords": [
        "男",
        "剪头",
        "理发",
        "男生理发"
      ]
    },
    {
      "unified": "1f487-200d-2640-fe0f",
      "keywords": [
        "女",
        "剪头",
        "理发",
        "女生理发"
      ]
    },
    {
      "unified": "1f6b6",
      "keywords": [
        "行人",
        "徒步",
        "走路"
      ]
    },
    {
      "unified": "1f6b6-200d-2642-fe0f",
      "keywords": [
        "男",
        "徒步",
        "走路",
        "男行人"
      ]
    },
    {
      "unified": "1f6b6-200d-2640-fe0f",
      "keywords": [
        "女",
        "徒步",
        "走路",
        "女行人"
      ]
    },
    {
      "unified": "1f6b6-200d-27a1-fe0f",
      "keywords": [
        "徒步",
        "行人",
        "走路",
        "行人面向右边"
      ]
    },
    {
      "unified": "1f6b6-200d-2640-fe0f-200d-27a1-fe0f",
      "keywords": [
        "女",
        "徒步",
        "走路",
        "女行人",
        "女行人面向右边"
      ]
    },
    {
      "unified": "1f6b6-200d-2642-fe0f-200d-27a1-fe0f",
      "keywords": [
        "男",
        "徒步",
        "走路",
        "男行人",
        "男行人面向右边"
      ]
    },
    {
      "unified": "1f9cd",
      "keywords": [
        "站着",
        "站立",
        "站立者"
      ]
    },
    {
      "unified": "1f9cd-200d-2642-fe0f",
      "keywords": [
        "男",
        "站着",
        "站立",
        "站立的男人"
      ]
    },
    {
      "unified": "1f9cd-200d-2640-fe0f",
      "keywords": [
        "女",
        "站着",
        "站立",
        "站立的女人"
      ]
    },
    {
      "unified": "1f9ce",
      "keywords": [
        "跪下",
        "跪坐",
        "下跪者"
      ]
    },
    {
      "unified": "1f9ce-200d-2642-fe0f",
      "keywords": [
        "男",
        "下跪",
        "跪坐",
        "跪下的男人"
      ]
    },
    {
      "unified": "1f9ce-200d-2640-fe0f",
      "keywords": [
        "女",
        "下跪",
        "跪坐",
        "跪下的女人"
      ]
    },
    {
      "unified": "1f9ce-200d-27a1-fe0f",
      "keywords": [
        "跪下",
        "跪坐",
        "下跪者",
        "下跪者面向右边"
      ]
    },
    {
      "unified": "1f9ce-200d-2640-fe0f-200d-27a1-fe0f",
      "keywords": [
        "女",
        "下跪",
        "跪坐",
        "跪下的女人",
        "跪下的女人面向右边"
      ]
    },
    {
      "unified": "1f9ce-200d-2642-fe0f-200d-27a1-fe0f",
      "keywords": [
        "男",
        "下跪",
        "跪坐",
        "跪下的男人",
        "跪下的男人面向右边"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9af",
      "keywords": [
        "盲",
        "无障碍",
        "拄盲杖的人"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9af-200d-27a1-fe0f",
      "keywords": [
        "盲",
        "无障碍",
        "拄盲杖的人",
        "拄盲杖的人面向右边"
      ]
    },
    {
      "unified": "1f468-200d-1f9af",
      "keywords": [
        "男",
        "盲",
        "拐杖",
        "无障碍",
        "拄盲杖的男人"
      ]
    },
    {
      "unified": "1f468-200d-1f9af-200d-27a1-fe0f",
      "keywords": [
        "男",
        "盲",
        "拐杖",
        "无障碍",
        "拄盲杖的男人",
        "拄盲杖的男人面向右边"
      ]
    },
    {
      "unified": "1f469-200d-1f9af",
      "keywords": [
        "女",
        "盲",
        "拐杖",
        "无障碍",
        "拄盲杖的女人"
      ]
    },
    {
      "unified": "1f469-200d-1f9af-200d-27a1-fe0f",
      "keywords": [
        "女",
        "盲",
        "拐杖",
        "无障碍",
        "拄盲杖的女人",
        "拄盲杖的女人面向右边"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9bc",
      "keywords": [
        "轮椅",
        "无障碍",
        "坐电动轮椅的人"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9bc-200d-27a1-fe0f",
      "keywords": [
        "轮椅",
        "无障碍",
        "坐电动轮椅的人",
        "坐电动轮椅的人面向右边"
      ]
    },
    {
      "unified": "1f468-200d-1f9bc",
      "keywords": [
        "男",
        "电动",
        "轮椅",
        "无障碍",
        "坐电动轮椅的男人"
      ]
    },
    {
      "unified": "1f468-200d-1f9bc-200d-27a1-fe0f",
      "keywords": [
        "男",
        "电动",
        "轮椅",
        "无障碍",
        "坐电动轮椅的男人",
        "坐电动轮椅的男人面向右边"
      ]
    },
    {
      "unified": "1f469-200d-1f9bc",
      "keywords": [
        "女",
        "电动",
        "轮椅",
        "无障碍",
        "坐电动轮椅的女人"
      ]
    },
    {
      "unified": "1f469-200d-1f9bc-200d-27a1-fe0f",
      "keywords": [
        "女",
        "电动",
        "轮椅",
        "无障碍",
        "坐电动轮椅的女人",
        "坐电动轮椅的女人面向右边"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9bd",
      "keywords": [
        "轮椅",
        "无障碍",
        "坐手动轮椅的人"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9bd-200d-27a1-fe0f",
      "keywords": [
        "轮椅",
        "无障碍",
        "坐手动轮椅的人",
        "坐手动轮椅的人面向右边"
      ]
    },
    {
      "unified": "1f468-200d-1f9bd",
      "keywords": [
        "男",
        "手动",
        "轮椅",
        "无障碍",
        "坐手动轮椅的男人"
      ]
    },
    {
      "unified": "1f468-200d-1f9bd-200d-27a1-fe0f",
      "keywords": [
        "男",
        "手动",
        "轮椅",
        "无障碍",
        "坐手动轮椅的男人",
        "坐手动轮椅的男人面向右边"
      ]
    },
    {
      "unified": "1f469-200d-1f9bd",
      "keywords": [
        "女",
        "手动",
        "轮椅",
        "无障碍",
        "坐手动轮椅的女人"
      ]
    },
    {
      "unified": "1f469-200d-1f9bd-200d-27a1-fe0f",
      "keywords": [
        "女",
        "手动",
        "轮椅",
        "无障碍",
        "坐手动轮椅的女人",
        "坐手动轮椅的女人面向右边"
      ]
    },
    {
      "unified": "1f3c3",
      "keywords": [
        "跑步",
        "跑步者",
        "马拉松"
      ]
    },
    {
      "unified": "1f3c3-200d-2642-fe0f",
      "keywords": [
        "男",
        "跑",
        "马拉松",
        "男生跑步"
      ]
    },
    {
      "unified": "1f3c3-200d-2640-fe0f",
      "keywords": [
        "女",
        "比赛",
        "跑步",
        "马拉松",
        "女生跑步"
      ]
    },
    {
      "unified": "1f3c3-200d-27a1-fe0f",
      "keywords": [
        "跑步",
        "跑步者",
        "马拉松",
        "跑步者面向右边"
      ]
    },
    {
      "unified": "1f3c3-200d-2640-fe0f-200d-27a1-fe0f",
      "keywords": [
        "女",
        "比赛",
        "跑步",
        "马拉松",
        "女生跑步",
        "女生跑步面向右边"
      ]
    },
    {
      "unified": "1f3c3-200d-2642-fe0f-200d-27a1-fe0f",
      "keywords": [
        "男",
        "跑",
        "马拉松",
        "男生跑步",
        "男生跑步面向右边"
      ]
    },
    {
      "unified": "1f483",
      "keywords": [
        "女人",
        "跳舞",
        "跳舞的女人"
      ]
    },
    {
      "unified": "1f57a",
      "keywords": [
        "男人",
        "跳舞",
        "跳舞的男人"
      ]
    },
    {
      "unified": "1f574-fe0f",
      "keywords": [
        "商务",
        "正装",
        "西装革履",
        "西装革履的人"
      ]
    },
    {
      "unified": "1f46f",
      "keywords": [
        "派对",
        "聚会",
        "跳舞",
        "兔耳朵",
        "戴兔耳朵的人"
      ]
    },
    {
      "unified": "1f46f-200d-2642-fe0f",
      "keywords": [
        "派对",
        "聚会",
        "跳舞",
        "兔先生",
        "兔耳朵",
        "男生派对"
      ]
    },
    {
      "unified": "1f46f-200d-2640-fe0f",
      "keywords": [
        "派对",
        "聚会",
        "跳舞",
        "兔女郎",
        "兔耳朵",
        "女生派对"
      ]
    },
    {
      "unified": "1f9d6",
      "keywords": [
        "桑拿",
        "蒸房",
        "蒸房里的人"
      ]
    },
    {
      "unified": "1f9d6-200d-2642-fe0f",
      "keywords": [
        "桑拿",
        "男性桑拿",
        "蒸房里的男人"
      ]
    },
    {
      "unified": "1f9d6-200d-2640-fe0f",
      "keywords": [
        "桑拿",
        "女性桑拿",
        "蒸房里的女人"
      ]
    },
    {
      "unified": "1f9d7",
      "keywords": [
        "登山者",
        "攀爬的人"
      ]
    },
    {
      "unified": "1f9d7-200d-2642-fe0f",
      "keywords": [
        "登山者",
        "攀爬的男人"
      ]
    },
    {
      "unified": "1f9d7-200d-2640-fe0f",
      "keywords": [
        "登山者",
        "攀爬的女人"
      ]
    },
    {
      "unified": "1f93a",
      "keywords": [
        "人",
        "剑",
        "体育",
        "击剑",
        "击剑选手"
      ]
    },
    {
      "unified": "1f3c7",
      "keywords": [
        "马",
        "赛马"
      ]
    },
    {
      "unified": "26f7-fe0f",
      "keywords": [
        "雪",
        "滑雪",
        "滑雪的人"
      ]
    },
    {
      "unified": "1f3c2",
      "keywords": [
        "雪",
        "滑雪",
        "滑雪板"
      ]
    },
    {
      "unified": "1f3cc-fe0f",
      "keywords": [
        "球",
        "高尔夫",
        "打高尔夫的人"
      ]
    },
    {
      "unified": "1f3cc-fe0f-200d-2642-fe0f",
      "keywords": [
        "男",
        "高尔夫",
        "男生打高尔夫"
      ]
    },
    {
      "unified": "1f3cc-fe0f-200d-2640-fe0f",
      "keywords": [
        "女",
        "高尔夫",
        "女生打高尔夫"
      ]
    },
    {
      "unified": "1f3c4",
      "keywords": [
        "冲浪"
      ]
    },
    {
      "unified": "1f3c4-200d-2642-fe0f",
      "keywords": [
        "男",
        "冲浪",
        "男生冲浪"
      ]
    },
    {
      "unified": "1f3c4-200d-2640-fe0f",
      "keywords": [
        "女",
        "冲浪",
        "女生冲浪"
      ]
    },
    {
      "unified": "1f6a3",
      "keywords": [
        "船",
        "划艇"
      ]
    },
    {
      "unified": "1f6a3-200d-2642-fe0f",
      "keywords": [
        "男",
        "船",
        "划船",
        "划艇",
        "男生划船"
      ]
    },
    {
      "unified": "1f6a3-200d-2640-fe0f",
      "keywords": [
        "女",
        "船",
        "划船",
        "划艇",
        "女生划船"
      ]
    },
    {
      "unified": "1f3ca",
      "keywords": [
        "游泳"
      ]
    },
    {
      "unified": "1f3ca-200d-2642-fe0f",
      "keywords": [
        "男",
        "游泳",
        "男生游泳"
      ]
    },
    {
      "unified": "1f3ca-200d-2640-fe0f",
      "keywords": [
        "女",
        "游泳",
        "女生游泳"
      ]
    },
    {
      "unified": "26f9-fe0f",
      "keywords": [
        "玩",
        "球",
        "玩球",
        "游戏"
      ]
    },
    {
      "unified": "26f9-fe0f-200d-2642-fe0f",
      "keywords": [
        "球",
        "男",
        "男生玩球"
      ]
    },
    {
      "unified": "26f9-fe0f-200d-2640-fe0f",
      "keywords": [
        "女",
        "玩",
        "球",
        "游戏",
        "女生玩球"
      ]
    },
    {
      "unified": "1f3cb-fe0f",
      "keywords": [
        "举重"
      ]
    },
    {
      "unified": "1f3cb-fe0f-200d-2642-fe0f",
      "keywords": [
        "男",
        "举重",
        "男生举重"
      ]
    },
    {
      "unified": "1f3cb-fe0f-200d-2640-fe0f",
      "keywords": [
        "女",
        "举重",
        "女生举重"
      ]
    },
    {
      "unified": "1f6b4",
      "keywords": [
        "单车",
        "自行车",
        "骑单车",
        "骑自行车"
      ]
    },
    {
      "unified": "1f6b4-200d-2642-fe0f",
      "keywords": [
        "男",
        "单车",
        "骑车",
        "自行车",
        "男生骑自行车"
      ]
    },
    {
      "unified": "1f6b4-200d-2640-fe0f",
      "keywords": [
        "女",
        "单车",
        "骑车",
        "自行车",
        "女生骑自行车"
      ]
    },
    {
      "unified": "1f6b5",
      "keywords": [
        "单车",
        "山地车",
        "自行车",
        "骑山地车",
        "骑山地车的人"
      ]
    },
    {
      "unified": "1f6b5-200d-2642-fe0f",
      "keywords": [
        "男",
        "单车",
        "山地车",
        "自行车",
        "男生骑山地车",
        "骑山地车的人"
      ]
    },
    {
      "unified": "1f6b5-200d-2640-fe0f",
      "keywords": [
        "女",
        "单车",
        "骑车",
        "山地车",
        "自行车",
        "女生骑山地车"
      ]
    },
    {
      "unified": "1f938",
      "keywords": [
        "人",
        "体操",
        "体育",
        "侧手翻",
        "翻筋斗"
      ]
    },
    {
      "unified": "1f938-200d-2642-fe0f",
      "keywords": [
        "男",
        "体操",
        "侧手翻",
        "翻筋斗",
        "男生侧手翻"
      ]
    },
    {
      "unified": "1f938-200d-2640-fe0f",
      "keywords": [
        "女",
        "体操",
        "侧手翻",
        "翻筋斗",
        "女生侧手翻"
      ]
    },
    {
      "unified": "1f93c",
      "keywords": [
        "人",
        "体育",
        "摔跤",
        "摔跤选手"
      ]
    },
    {
      "unified": "1f93c-200d-2642-fe0f",
      "keywords": [
        "男",
        "打架",
        "摔跤",
        "男生摔跤"
      ]
    },
    {
      "unified": "1f93c-200d-2640-fe0f",
      "keywords": [
        "女",
        "打架",
        "摔跤",
        "女生摔跤"
      ]
    },
    {
      "unified": "1f93d",
      "keywords": [
        "人",
        "水球",
        "体育"
      ]
    },
    {
      "unified": "1f93d-200d-2642-fe0f",
      "keywords": [
        "男",
        "水球",
        "男生玩水球"
      ]
    },
    {
      "unified": "1f93d-200d-2640-fe0f",
      "keywords": [
        "女",
        "水球",
        "女生玩水球"
      ]
    },
    {
      "unified": "1f93e",
      "keywords": [
        "人",
        "手球",
        "体育"
      ]
    },
    {
      "unified": "1f93e-200d-2642-fe0f",
      "keywords": [
        "男",
        "手球",
        "男生玩手球"
      ]
    },
    {
      "unified": "1f93e-200d-2640-fe0f",
      "keywords": [
        "女",
        "手球",
        "女生玩手球"
      ]
    },
    {
      "unified": "1f939",
      "keywords": [
        "平衡",
        "抛接",
        "杂技",
        "杂耍",
        "抛接杂耍"
      ]
    },
    {
      "unified": "1f939-200d-2642-fe0f",
      "keywords": [
        "男",
        "杂技",
        "杂耍",
        "颠球",
        "男生抛接杂耍"
      ]
    },
    {
      "unified": "1f939-200d-2640-fe0f",
      "keywords": [
        "女",
        "杂技",
        "杂耍",
        "颠球",
        "女生抛接杂耍"
      ]
    },
    {
      "unified": "1f9d8",
      "keywords": [
        "冥想",
        "瑜伽",
        "盘腿的人"
      ]
    },
    {
      "unified": "1f9d8-200d-2642-fe0f",
      "keywords": [
        "和尚",
        "瑜伽男",
        "盘腿的男人"
      ]
    },
    {
      "unified": "1f9d8-200d-2640-fe0f",
      "keywords": [
        "尼姑",
        "比丘尼",
        "瑜伽女",
        "盘腿的女人"
      ]
    },
    {
      "unified": "1f6c0",
      "keywords": [
        "洗澡",
        "浴缸",
        "洗澡的人"
      ]
    },
    {
      "unified": "1f6cc",
      "keywords": [
        "入睡",
        "宾馆",
        "酒店",
        "躺在床上的人"
      ]
    },
    {
      "unified": "1f9d1-200d-1f91d-200d-1f9d1",
      "keywords": [
        "人",
        "手",
        "情侣",
        "拉手",
        "握手",
        "手拉手的两个人"
      ]
    },
    {
      "unified": "1f46d",
      "keywords": [
        "情侣",
        "手拉手",
        "两个女人",
        "手拉手的两个女人"
      ]
    },
    {
      "unified": "1f46b",
      "keywords": [
        "情侣",
        "手拉手",
        "一男一女",
        "手拉手的一男一女"
      ]
    },
    {
      "unified": "1f46c",
      "keywords": [
        "情侣",
        "双子座",
        "手拉手",
        "两个男人",
        "黄道十二宫",
        "手拉手的两个男人"
      ]
    },
    {
      "unified": "1f48f",
      "keywords": [
        "亲吻",
        "情侣",
        "接吻",
        "浪漫"
      ]
    },
    {
      "unified": "1f469-200d-2764-fe0f-200d-1f48b-200d-1f468",
      "keywords": [
        "亲吻",
        "女人",
        "情侣",
        "接吻",
        "浪漫",
        "男人",
        "亲吻: 女人男人"
      ]
    },
    {
      "unified": "1f468-200d-2764-fe0f-200d-1f48b-200d-1f468",
      "keywords": [
        "亲吻",
        "情侣",
        "接吻",
        "浪漫",
        "男人",
        "亲吻: 男人男人"
      ]
    },
    {
      "unified": "1f469-200d-2764-fe0f-200d-1f48b-200d-1f469",
      "keywords": [
        "亲吻",
        "女人",
        "情侣",
        "接吻",
        "浪漫",
        "亲吻: 女人女人"
      ]
    },
    {
      "unified": "1f491",
      "keywords": [
        "情侣",
        "恋爱",
        "浪漫",
        "红心"
      ]
    },
    {
      "unified": "1f469-200d-2764-fe0f-200d-1f468",
      "keywords": [
        "女人",
        "恋爱",
        "情侣",
        "浪漫",
        "男人",
        "红心",
        "情侣: 女人男人"
      ]
    },
    {
      "unified": "1f468-200d-2764-fe0f-200d-1f468",
      "keywords": [
        "恋爱",
        "情侣",
        "浪漫",
        "男人",
        "红心",
        "情侣: 男人男人"
      ]
    },
    {
      "unified": "1f469-200d-2764-fe0f-200d-1f469",
      "keywords": [
        "女人",
        "恋爱",
        "情侣",
        "浪漫",
        "红心",
        "情侣: 女人女人"
      ]
    },
    {
      "unified": "1f468-200d-1f469-200d-1f466",
      "keywords": [
        "女人",
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人女人男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f469-200d-1f467",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "男人",
        "家庭: 男人女人女孩"
      ]
    },
    {
      "unified": "1f468-200d-1f469-200d-1f467-200d-1f466",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人女人女孩男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f469-200d-1f466-200d-1f466",
      "keywords": [
        "女人",
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人女人男孩男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f469-200d-1f467-200d-1f467",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "男人",
        "家庭: 男人女人女孩女孩"
      ]
    },
    {
      "unified": "1f468-200d-1f468-200d-1f466",
      "keywords": [
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人男人男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f468-200d-1f467",
      "keywords": [
        "女孩",
        "家庭",
        "男人",
        "家庭: 男人男人女孩"
      ]
    },
    {
      "unified": "1f468-200d-1f468-200d-1f467-200d-1f466",
      "keywords": [
        "女孩",
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人男人女孩男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f468-200d-1f466-200d-1f466",
      "keywords": [
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人男人男孩男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f468-200d-1f467-200d-1f467",
      "keywords": [
        "女孩",
        "家庭",
        "男人",
        "家庭: 男人男人女孩女孩"
      ]
    },
    {
      "unified": "1f469-200d-1f469-200d-1f466",
      "keywords": [
        "女人",
        "家庭",
        "男孩",
        "家庭: 女人女人男孩"
      ]
    },
    {
      "unified": "1f469-200d-1f469-200d-1f467",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "家庭: 女人女人女孩"
      ]
    },
    {
      "unified": "1f469-200d-1f469-200d-1f467-200d-1f466",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "男孩",
        "家庭: 女人女人女孩男孩"
      ]
    },
    {
      "unified": "1f469-200d-1f469-200d-1f466-200d-1f466",
      "keywords": [
        "女人",
        "家庭",
        "男孩",
        "家庭: 女人女人男孩男孩"
      ]
    },
    {
      "unified": "1f469-200d-1f469-200d-1f467-200d-1f467",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "家庭: 女人女人女孩女孩"
      ]
    },
    {
      "unified": "1f468-200d-1f466",
      "keywords": [
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f466-200d-1f466",
      "keywords": [
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人男孩男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f467",
      "keywords": [
        "女孩",
        "家庭",
        "男人",
        "家庭: 男人女孩"
      ]
    },
    {
      "unified": "1f468-200d-1f467-200d-1f466",
      "keywords": [
        "女孩",
        "家庭",
        "男人",
        "男孩",
        "家庭: 男人女孩男孩"
      ]
    },
    {
      "unified": "1f468-200d-1f467-200d-1f467",
      "keywords": [
        "女孩",
        "家庭",
        "男人",
        "家庭: 男人女孩女孩"
      ]
    },
    {
      "unified": "1f469-200d-1f466",
      "keywords": [
        "女人",
        "家庭",
        "男孩",
        "家庭: 女人男孩"
      ]
    },
    {
      "unified": "1f469-200d-1f466-200d-1f466",
      "keywords": [
        "女人",
        "家庭",
        "男孩",
        "家庭: 女人男孩男孩"
      ]
    },
    {
      "unified": "1f469-200d-1f467",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "家庭: 女人女孩"
      ]
    },
    {
      "unified": "1f469-200d-1f467-200d-1f466",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "男孩",
        "家庭: 女人女孩男孩"
      ]
    },
    {
      "unified": "1f469-200d-1f467-200d-1f467",
      "keywords": [
        "女人",
        "女孩",
        "家庭",
        "家庭: 女人女孩女孩"
      ]
    },
    {
      "unified": "1f5e3-fe0f",
      "keywords": [
        "头",
        "说话",
        "剪影",
        "讲话"
      ]
    },
    {
      "unified": "1f464",
      "keywords": [
        "人像",
        "剪影",
        "半身像"
      ]
    },
    {
      "unified": "1f465",
      "keywords": [
        "剪影",
        "双人像",
        "半身像"
      ]
    },
    {
      "unified": "1fac2",
      "keywords": [
        "再见",
        "您好",
        "感谢",
        "拥抱",
        "人的拥抱"
      ]
    },
    {
      "unified": "1f46a",
      "keywords": [
        "家庭"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9d1-200d-1f9d2",
      "keywords": [
        "一孩",
        "家庭",
        "父母",
        "一孩家庭",
        "独生子女"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9d1-200d-1f9d2-200d-1f9d2",
      "keywords": [
        "二孩",
        "家庭",
        "父母",
        "二孩家庭",
        "非独生子女"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9d2",
      "keywords": [
        "一孩",
        "单亲",
        "孩子",
        "家庭",
        "母亲",
        "父亲",
        "单亲一孩家庭"
      ]
    },
    {
      "unified": "1f9d1-200d-1f9d2-200d-1f9d2",
      "keywords": [
        "二孩",
        "单亲",
        "孩子",
        "家庭",
        "母亲",
        "父亲",
        "单亲二孩家庭"
      ]
    },
    {
      "unified": "1f463",
      "keywords": [
        "脚印",
        "足迹"
      ]
    }
  ],
  "animals_nature": [
    {
      "unified": "1f435",
      "keywords": [
        "猴",
        "猴头"
      ]
    },
    {
      "unified": "1f412",
      "keywords": [
        "猴",
        "猴子"
      ]
    },
    {
      "unified": "1f98d",
      "keywords": [
        "大猩猩"
      ]
    },
    {
      "unified": "1f9a7",
      "keywords": [
        "猴",
        "猿",
        "猩猩",
        "红毛猩猩"
      ]
    },
    {
      "unified": "1f436",
      "keywords": [
        "狗",
        "脸",
        "狗脸",
        "宠物"
      ]
    },
    {
      "unified": "1f415",
      "keywords": [
        "狗",
        "宠物"
      ]
    },
    {
      "unified": "1f9ae",
      "keywords": [
        "盲",
        "指引",
        "导盲犬",
        "无障碍"
      ]
    },
    {
      "unified": "1f415-200d-1f9ba",
      "keywords": [
        "犬",
        "狗",
        "辅助",
        "服务犬",
        "工作犬",
        "无障碍"
      ]
    },
    {
      "unified": "1f429",
      "keywords": [
        "狗",
        "贵宾犬",
        "卷毛狗"
      ]
    },
    {
      "unified": "1f43a",
      "keywords": [
        "狼",
        "头",
        "脸"
      ]
    },
    {
      "unified": "1f98a",
      "keywords": [
        "头",
        "脸",
        "狐狸"
      ]
    },
    {
      "unified": "1f99d",
      "keywords": [
        "浣熊",
        "好奇",
        "淘气"
      ]
    },
    {
      "unified": "1f431",
      "keywords": [
        "猫",
        "脸",
        "猫脸",
        "宠物"
      ]
    },
    {
      "unified": "1f408",
      "keywords": [
        "猫",
        "宠物"
      ]
    },
    {
      "unified": "1f408-200d-2b1b",
      "keywords": [
        "猫",
        "黑猫",
        "黑色",
        "不吉利"
      ]
    },
    {
      "unified": "1f981",
      "keywords": [
        "脸",
        "狮子",
        "狮子座",
        "黄道十二宫"
      ]
    },
    {
      "unified": "1f42f",
      "keywords": [
        "脸",
        "老虎",
        "老虎头"
      ]
    },
    {
      "unified": "1f405",
      "keywords": [
        "虎",
        "老虎"
      ]
    },
    {
      "unified": "1f406",
      "keywords": [
        "豹",
        "豹子",
        "猎豹"
      ]
    },
    {
      "unified": "1f434",
      "keywords": [
        "马",
        "马头"
      ]
    },
    {
      "unified": "1face",
      "keywords": [
        "驼鹿",
        "动物",
        "鹿角",
        "麋鹿",
        "哺乳动物"
      ]
    },
    {
      "unified": "1facf",
      "keywords": [
        "驴",
        "犟",
        "骡",
        "倔强",
        "动物",
        "驴子",
        "哺乳动物"
      ]
    },
    {
      "unified": "1f40e",
      "keywords": [
        "马",
        "比赛",
        "赛马",
        "骑马"
      ]
    },
    {
      "unified": "1f984",
      "keywords": [
        "头",
        "脸",
        "独角兽"
      ]
    },
    {
      "unified": "1f993",
      "keywords": [
        "斑马",
        "条纹"
      ]
    },
    {
      "unified": "1f98c",
      "keywords": [
        "鹿"
      ]
    },
    {
      "unified": "1f9ac",
      "keywords": [
        "水牛",
        "畜群",
        "大野牛",
        "欧洲野牛"
      ]
    },
    {
      "unified": "1f42e",
      "keywords": [
        "脸",
        "奶牛",
        "奶牛头"
      ]
    },
    {
      "unified": "1f402",
      "keywords": [
        "牛",
        "公牛",
        "金牛座",
        "黄道十二宫"
      ]
    },
    {
      "unified": "1f403",
      "keywords": [
        "水牛"
      ]
    },
    {
      "unified": "1f404",
      "keywords": [
        "牛",
        "奶牛"
      ]
    },
    {
      "unified": "1f437",
      "keywords": [
        "猪",
        "脸",
        "猪头"
      ]
    },
    {
      "unified": "1f416",
      "keywords": [
        "猪"
      ]
    },
    {
      "unified": "1f417",
      "keywords": [
        "猪",
        "野猪"
      ]
    },
    {
      "unified": "1f43d",
      "keywords": [
        "猪",
        "脸",
        "鼻子",
        "猪鼻子"
      ]
    },
    {
      "unified": "1f40f",
      "keywords": [
        "羊",
        "公羊",
        "雄性",
        "白羊座",
        "黄道十二宫"
      ]
    },
    {
      "unified": "1f411",
      "keywords": [
        "羊",
        "母羊",
        "雌性"
      ]
    },
    {
      "unified": "1f410",
      "keywords": [
        "山羊",
        "摩羯座",
        "黄道十二宫"
      ]
    },
    {
      "unified": "1f42a",
      "keywords": [
        "骆驼",
        "单峰"
      ]
    },
    {
      "unified": "1f42b",
      "keywords": [
        "双峰",
        "骆驼",
        "双峰骆驼"
      ]
    },
    {
      "unified": "1f999",
      "keywords": [
        "原驼",
        "羊毛",
        "羊驼",
        "美洲鸵",
        "小羊驼"
      ]
    },
    {
      "unified": "1f992",
      "keywords": [
        "斑点",
        "长颈鹿"
      ]
    },
    {
      "unified": "1f418",
      "keywords": [
        "象",
        "大象"
      ]
    },
    {
      "unified": "1f9a3",
      "keywords": [
        "猛犸",
        "大型",
        "灭绝",
        "长牙",
        "有绒毛的"
      ]
    },
    {
      "unified": "1f98f",
      "keywords": [
        "犀牛"
      ]
    },
    {
      "unified": "1f99b",
      "keywords": [
        "河马"
      ]
    },
    {
      "unified": "1f42d",
      "keywords": [
        "鼠",
        "老鼠头"
      ]
    },
    {
      "unified": "1f401",
      "keywords": [
        "鼠",
        "老鼠",
        "耗子"
      ]
    },
    {
      "unified": "1f400",
      "keywords": [
        "鼠",
        "耗子"
      ]
    },
    {
      "unified": "1f439",
      "keywords": [
        "头",
        "脸",
        "仓鼠",
        "啮齿"
      ]
    },
    {
      "unified": "1f430",
      "keywords": [
        "兔",
        "兔子头"
      ]
    },
    {
      "unified": "1f407",
      "keywords": [
        "兔",
        "兔子"
      ]
    },
    {
      "unified": "1f43f-fe0f",
      "keywords": [
        "松鼠",
        "花栗鼠"
      ]
    },
    {
      "unified": "1f9ab",
      "keywords": [
        "海狸",
        "母畜"
      ]
    },
    {
      "unified": "1f994",
      "keywords": [
        "刺猬"
      ]
    },
    {
      "unified": "1f987",
      "keywords": [
        "蝙蝠",
        "吸血鬼"
      ]
    },
    {
      "unified": "1f43b",
      "keywords": [
        "熊",
        "头",
        "脸"
      ]
    },
    {
      "unified": "1f43b-200d-2744-fe0f",
      "keywords": [
        "熊",
        "北极",
        "白色",
        "北极熊"
      ]
    },
    {
      "unified": "1f428",
      "keywords": [
        "考拉",
        "有袋类动物"
      ]
    },
    {
      "unified": "1f43c",
      "keywords": [
        "头",
        "脸",
        "熊猫",
        "胖达"
      ]
    },
    {
      "unified": "1f9a5",
      "keywords": [
        "慢",
        "懒",
        "树懒",
        "爬树",
        "迟缓"
      ]
    },
    {
      "unified": "1f9a6",
      "keywords": [
        "獭",
        "鼬",
        "水獭",
        "动物",
        "捕鱼"
      ]
    },
    {
      "unified": "1f9a8",
      "keywords": [
        "熏",
        "臭",
        "鼬",
        "臭鼬"
      ]
    },
    {
      "unified": "1f998",
      "keywords": [
        "跳",
        "袋鼠",
        "小袋鼠",
        "有袋类动物"
      ]
    },
    {
      "unified": "1f9a1",
      "keywords": [
        "獾",
        "纠缠",
        "蜜獾"
      ]
    },
    {
      "unified": "1f43e",
      "keywords": [
        "爪印",
        "爪子",
        "足迹"
      ]
    },
    {
      "unified": "1f983",
      "keywords": [
        "火鸡"
      ]
    },
    {
      "unified": "1f414",
      "keywords": [
        "鸡"
      ]
    },
    {
      "unified": "1f413",
      "keywords": [
        "鸡",
        "公鸡"
      ]
    },
    {
      "unified": "1f423",
      "keywords": [
        "小鸡",
        "破壳",
        "小鸡破壳"
      ]
    },
    {
      "unified": "1f424",
      "keywords": [
        "鸡",
        "小鸡"
      ]
    },
    {
      "unified": "1f425",
      "keywords": [
        "小鸡",
        "正面朝向的小鸡"
      ]
    },
    {
      "unified": "1f426",
      "keywords": [
        "鸟"
      ]
    },
    {
      "unified": "1f427",
      "keywords": [
        "企鹅"
      ]
    },
    {
      "unified": "1f54a-fe0f",
      "keywords": [
        "鸽",
        "鸟",
        "飞翔",
        "鸽子",
        "和平象征"
      ]
    },
    {
      "unified": "1f985",
      "keywords": [
        "鹰",
        "鸟",
        "老鹰"
      ]
    },
    {
      "unified": "1f986",
      "keywords": [
        "鸟",
        "鸭",
        "鸭子"
      ]
    },
    {
      "unified": "1f9a2",
      "keywords": [
        "鸟",
        "天鹅",
        "丑小鸭",
        "小天鹅"
      ]
    },
    {
      "unified": "1f989",
      "keywords": [
        "鸟",
        "睿智",
        "猫头鹰"
      ]
    },
    {
      "unified": "1f9a4",
      "keywords": [
        "灭绝",
        "渡渡鸟",
        "毛里求斯"
      ]
    },
    {
      "unified": "1fab6",
      "keywords": [
        "轻",
        "飞",
        "鸟",
        "羽毛"
      ]
    },
    {
      "unified": "1f9a9",
      "keywords": [
        "热带",
        "艳丽",
        "火烈鸟"
      ]
    },
    {
      "unified": "1f99a",
      "keywords": [
        "鸟",
        "孔雀",
        "招摇",
        "骄傲",
        "雌孔雀"
      ]
    },
    {
      "unified": "1f99c",
      "keywords": [
        "鸟",
        "鹦鹉",
        "剽窃",
        "模仿",
        "说话"
      ]
    },
    {
      "unified": "1fabd",
      "keywords": [
        "鸟",
        "翅膀",
        "天使",
        "神话",
        "飞翔",
        "飞行"
      ]
    },
    {
      "unified": "1f426-200d-2b1b",
      "keywords": [
        "鸟",
        "乌鸦",
        "老鸦",
        "黑色",
        "黑色的鸟",
        "秃鼻乌鸦"
      ]
    },
    {
      "unified": "1fabf",
      "keywords": [
        "鹅",
        "傻",
        "鸟",
        "家禽",
        "鸣叫"
      ]
    },
    {
      "unified": "1f426-200d-1f525",
      "keywords": [
        "凤凰",
        "幻兽",
        "幻想",
        "火鸟",
        "重生",
        "灵魂转世"
      ]
    },
    {
      "unified": "1f438",
      "keywords": [
        "头",
        "脸",
        "青蛙"
      ]
    },
    {
      "unified": "1f40a",
      "keywords": [
        "鳄鱼"
      ]
    },
    {
      "unified": "1f422",
      "keywords": [
        "龟",
        "乌龟",
        "海龟"
      ]
    },
    {
      "unified": "1f98e",
      "keywords": [
        "蜥蜴",
        "爬行动物"
      ]
    },
    {
      "unified": "1f40d",
      "keywords": [
        "蛇",
        "持票人",
        "蛇夫座",
        "狡猾的人",
        "黄道十二宫"
      ]
    },
    {
      "unified": "1f432",
      "keywords": [
        "龙",
        "龙头"
      ]
    },
    {
      "unified": "1f409",
      "keywords": [
        "龙"
      ]
    },
    {
      "unified": "1f995",
      "keywords": [
        "梁龙",
        "腕龙",
        "雷龙",
        "蜥蜴类"
      ]
    },
    {
      "unified": "1f996",
      "keywords": [
        "霸王龙",
        "暴龙君主"
      ]
    },
    {
      "unified": "1f433",
      "keywords": [
        "鲸",
        "喷水",
        "喷水的鲸"
      ]
    },
    {
      "unified": "1f40b",
      "keywords": [
        "鲸鱼"
      ]
    },
    {
      "unified": "1f42c",
      "keywords": [
        "海豚",
        "鸭脚板"
      ]
    },
    {
      "unified": "1f9ad",
      "keywords": [
        "海豹",
        "海狮"
      ]
    },
    {
      "unified": "1f41f",
      "keywords": [
        "鱼",
        "双鱼座",
        "黄道十二宫"
      ]
    },
    {
      "unified": "1f420",
      "keywords": [
        "鱼",
        "热带",
        "热带鱼"
      ]
    },
    {
      "unified": "1f421",
      "keywords": [
        "鱼",
        "河豚"
      ]
    },
    {
      "unified": "1f988",
      "keywords": [
        "鱼",
        "鲨",
        "鲨鱼"
      ]
    },
    {
      "unified": "1f419",
      "keywords": [
        "鱼",
        "章鱼",
        "八爪"
      ]
    },
    {
      "unified": "1f41a",
      "keywords": [
        "螺",
        "海螺"
      ]
    },
    {
      "unified": "1fab8",
      "keywords": [
        "礁",
        "珊瑚",
        "海洋"
      ]
    },
    {
      "unified": "1fabc",
      "keywords": [
        "水母",
        "发光",
        "哎哟",
        "海洋",
        "海蜇",
        "有刺动物",
        "无脊椎动物"
      ]
    },
    {
      "unified": "1f40c",
      "keywords": [
        "蜗牛"
      ]
    },
    {
      "unified": "1f98b",
      "keywords": [
        "蝴蝶",
        "昆虫",
        "漂亮",
        "美丽"
      ]
    },
    {
      "unified": "1f41b",
      "keywords": [
        "毛虫",
        "毛毛虫"
      ]
    },
    {
      "unified": "1f41c",
      "keywords": [
        "蚂蚁"
      ]
    },
    {
      "unified": "1f41d",
      "keywords": [
        "蜜蜂",
        "勤劳"
      ]
    },
    {
      "unified": "1fab2",
      "keywords": [
        "甲虫",
        "昆虫"
      ]
    },
    {
      "unified": "1f41e",
      "keywords": [
        "母",
        "瓢虫",
        "昆虫"
      ]
    },
    {
      "unified": "1f997",
      "keywords": [
        "蟋蟀",
        "蛐蛐"
      ]
    },
    {
      "unified": "1fab3",
      "keywords": [
        "蟑螂",
        "害虫",
        "昆虫"
      ]
    },
    {
      "unified": "1f577-fe0f",
      "keywords": [
        "蜘蛛"
      ]
    },
    {
      "unified": "1f578-fe0f",
      "keywords": [
        "蛛网",
        "蜘蛛网"
      ]
    },
    {
      "unified": "1f982",
      "keywords": [
        "蝎子",
        "天蝎宫",
        "天蝎座",
        "黄道十二宫"
      ]
    },
    {
      "unified": "1f99f",
      "keywords": [
        "蚊子",
        "发热",
        "昆虫",
        "疟疾",
        "疾病",
        "病毒"
      ]
    },
    {
      "unified": "1fab0",
      "keywords": [
        "蛆",
        "苍蝇",
        "害虫",
        "疾病",
        "腐烂"
      ]
    },
    {
      "unified": "1fab1",
      "keywords": [
        "蠕虫",
        "蚯蚓",
        "寄生虫",
        "环节动物"
      ]
    },
    {
      "unified": "1f9a0",
      "keywords": [
        "细菌",
        "病毒",
        "变形虫"
      ]
    },
    {
      "unified": "1f490",
      "keywords": [
        "花束",
        "鲜花"
      ]
    },
    {
      "unified": "1f338",
      "keywords": [
        "花",
        "樱花"
      ]
    },
    {
      "unified": "1f4ae",
      "keywords": [
        "花",
        "白花"
      ]
    },
    {
      "unified": "1fab7",
      "keywords": [
        "花",
        "莲花",
        "佛教",
        "纯洁",
        "印度教"
      ]
    },
    {
      "unified": "1f3f5-fe0f",
      "keywords": [
        "花",
        "圆形花饰"
      ]
    },
    {
      "unified": "1f339",
      "keywords": [
        "花",
        "玫瑰"
      ]
    },
    {
      "unified": "1f940",
      "keywords": [
        "花",
        "枯萎的花"
      ]
    },
    {
      "unified": "1f33a",
      "keywords": [
        "花",
        "芙蓉",
        "木槿"
      ]
    },
    {
      "unified": "1f33b",
      "keywords": [
        "花",
        "向日葵",
        "太阳花"
      ]
    },
    {
      "unified": "1f33c",
      "keywords": [
        "花",
        "开花"
      ]
    },
    {
      "unified": "1f337",
      "keywords": [
        "花",
        "郁金香"
      ]
    },
    {
      "unified": "1fabb",
      "keywords": [
        "花",
        "风信子",
        "羽扇豆",
        "蓝帽花",
        "薰衣草",
        "金鱼草"
      ]
    },
    {
      "unified": "1f331",
      "keywords": [
        "芽",
        "苗",
        "幼苗",
        "发芽"
      ]
    },
    {
      "unified": "1fab4",
      "keywords": [
        "培育",
        "房子",
        "枯燥",
        "植物",
        "生长",
        "盆栽植物"
      ]
    },
    {
      "unified": "1f332",
      "keywords": [
        "树",
        "松树",
        "常青树"
      ]
    },
    {
      "unified": "1f333",
      "keywords": [
        "树",
        "落叶",
        "落叶树",
        "落叶植物"
      ]
    },
    {
      "unified": "1f334",
      "keywords": [
        "棕榈树"
      ]
    },
    {
      "unified": "1f335",
      "keywords": [
        "沙漠",
        "仙人掌"
      ]
    },
    {
      "unified": "1f33e",
      "keywords": [
        "稻",
        "米",
        "稻子",
        "粮食"
      ]
    },
    {
      "unified": "1f33f",
      "keywords": [
        "药草",
        "草药",
        "香草"
      ]
    },
    {
      "unified": "2618-fe0f",
      "keywords": [
        "苜蓿",
        "三叶草",
        "酢浆草"
      ]
    },
    {
      "unified": "1f340",
      "keywords": [
        "幸运",
        "四叶草"
      ]
    },
    {
      "unified": "1f341",
      "keywords": [
        "秋",
        "枫叶",
        "加拿大"
      ]
    },
    {
      "unified": "1f342",
      "keywords": [
        "叶",
        "秋",
        "落叶"
      ]
    },
    {
      "unified": "1f343",
      "keywords": [
        "叶子",
        "树叶",
        "风吹叶落",
        "随风飘舞"
      ]
    },
    {
      "unified": "1fab9",
      "keywords": [
        "空巢",
        "筑巢"
      ]
    },
    {
      "unified": "1faba",
      "keywords": [
        "筑巢",
        "有蛋的巢"
      ]
    },
    {
      "unified": "1f344",
      "keywords": [
        "蘑菇"
      ]
    }
  ],
  "food_drink": [
    {
      "unified": "1f347",
      "keywords": [
        "葡萄",
        "水果"
      ]
    },
    {
      "unified": "1f348",
      "keywords": [
        "甜瓜",
        "水果",
        "蜜瓜",
        "香瓜"
      ]
    },
    {
      "unified": "1f349",
      "keywords": [
        "西瓜",
        "水果"
      ]
    },
    {
      "unified": "1f34a",
      "keywords": [
        "橘子",
        "柑桔",
        "桔子",
        "水果"
      ]
    },
    {
      "unified": "1f34b",
      "keywords": [
        "柠檬",
        "水果"
      ]
    },
    {
      "unified": "1f34b-200d-1f7e9",
      "keywords": [
        "青柠",
        "橘属",
        "热带",
        "酸橙",
        "柑橘属"
      ]
    },
    {
      "unified": "1f34c",
      "keywords": [
        "香蕉",
        "水果"
      ]
    },
    {
      "unified": "1f34d",
      "keywords": [
        "菠萝",
        "水果"
      ]
    },
    {
      "unified": "1f96d",
      "keywords": [
        "芒果",
        "水果",
        "热带"
      ]
    },
    {
      "unified": "1f34e",
      "keywords": [
        "红",
        "水果",
        "苹果",
        "红苹果"
      ]
    },
    {
      "unified": "1f34f",
      "keywords": [
        "青",
        "水果",
        "苹果",
        "青苹果"
      ]
    },
    {
      "unified": "1f350",
      "keywords": [
        "梨",
        "水果"
      ]
    },
    {
      "unified": "1f351",
      "keywords": [
        "桃",
        "水果"
      ]
    },
    {
      "unified": "1f352",
      "keywords": [
        "樱桃",
        "水果"
      ]
    },
    {
      "unified": "1f353",
      "keywords": [
        "草莓",
        "水果"
      ]
    },
    {
      "unified": "1fad0",
      "keywords": [
        "蓝莓",
        "越桔"
      ]
    },
    {
      "unified": "1f95d",
      "keywords": [
        "水果",
        "食物",
        "猕猴桃",
        "奇异果"
      ]
    },
    {
      "unified": "1f345",
      "keywords": [
        "番茄",
        "蔬菜",
        "西红柿"
      ]
    },
    {
      "unified": "1fad2",
      "keywords": [
        "橄榄",
        "食物"
      ]
    },
    {
      "unified": "1f965",
      "keywords": [
        "椰子",
        "棕榈"
      ]
    },
    {
      "unified": "1f951",
      "keywords": [
        "鳄梨",
        "水果",
        "食物",
        "牛油果"
      ]
    },
    {
      "unified": "1f346",
      "keywords": [
        "茄子",
        "蔬菜"
      ]
    },
    {
      "unified": "1f954",
      "keywords": [
        "土豆",
        "蔬菜",
        "食物",
        "马铃薯"
      ]
    },
    {
      "unified": "1f955",
      "keywords": [
        "蔬菜",
        "食物",
        "胡萝卜"
      ]
    },
    {
      "unified": "1f33d",
      "keywords": [
        "玉米",
        "苞米"
      ]
    },
    {
      "unified": "1f336-fe0f",
      "keywords": [
        "辣椒",
        "红辣椒"
      ]
    },
    {
      "unified": "1fad1",
      "keywords": [
        "蔬菜",
        "辣椒",
        "灯笼椒"
      ]
    },
    {
      "unified": "1f952",
      "keywords": [
        "黄瓜",
        "泡菜",
        "蔬菜",
        "食物"
      ]
    },
    {
      "unified": "1f96c",
      "keywords": [
        "甘蓝",
        "莴苣",
        "圆白菜",
        "小白菜",
        "绿叶蔬菜"
      ]
    },
    {
      "unified": "1f966",
      "keywords": [
        "甘蓝",
        "西兰花"
      ]
    },
    {
      "unified": "1f9c4",
      "keywords": [
        "蒜",
        "佐料",
        "大蒜",
        "蒜头",
        "调味"
      ]
    },
    {
      "unified": "1f9c5",
      "keywords": [
        "洋葱",
        "佐料",
        "调味"
      ]
    },
    {
      "unified": "1f95c",
      "keywords": [
        "花生",
        "坚果",
        "蔬菜",
        "食物"
      ]
    },
    {
      "unified": "1fad8",
      "keywords": [
        "豆",
        "肾",
        "豆类",
        "食物"
      ]
    },
    {
      "unified": "1f330",
      "keywords": [
        "栗子"
      ]
    },
    {
      "unified": "1fada",
      "keywords": [
        "姜",
        "根",
        "啤酒",
        "根茎",
        "香料"
      ]
    },
    {
      "unified": "1fadb",
      "keywords": [
        "荚",
        "豆",
        "毛豆",
        "蔬菜",
        "豆荚",
        "豌豆",
        "豌豆荚"
      ]
    },
    {
      "unified": "1f344-200d-1f7eb",
      "keywords": [
        "棕色",
        "植物",
        "自然",
        "菌类",
        "褐色",
        "褐菇",
        "食物",
        "褐色蘑菇"
      ]
    },
    {
      "unified": "1f35e",
      "keywords": [
        "面包"
      ]
    },
    {
      "unified": "1f950",
      "keywords": [
        "法式",
        "面包",
        "食物",
        "羊角面包",
        "新月形面包"
      ]
    },
    {
      "unified": "1f956",
      "keywords": [
        "法式",
        "面包",
        "食物",
        "法式长棍面包"
      ]
    },
    {
      "unified": "1fad3",
      "keywords": [
        "扁面包",
        "玉米饼",
        "皮塔饼",
        "薄脆饼",
        "圆盘状烤饼"
      ]
    },
    {
      "unified": "1f968",
      "keywords": [
        "椒盐卷饼",
        "扭曲食品"
      ]
    },
    {
      "unified": "1f96f",
      "keywords": [
        "面包圈",
        "奶酪酱",
        "烘烤食品"
      ]
    },
    {
      "unified": "1f95e",
      "keywords": [
        "烙饼",
        "煎饼",
        "食物"
      ]
    },
    {
      "unified": "1f9c7",
      "keywords": [
        "烤",
        "点心",
        "华夫饼",
        "格子饼",
        "窝夫饼"
      ]
    },
    {
      "unified": "1f9c0",
      "keywords": [
        "芝士",
        "奶酪",
        "起司"
      ]
    },
    {
      "unified": "1f356",
      "keywords": [
        "肉",
        "骨",
        "排骨"
      ]
    },
    {
      "unified": "1f357",
      "keywords": [
        "家禽",
        "鸡肉",
        "鸡腿",
        "家禽的腿"
      ]
    },
    {
      "unified": "1f969",
      "keywords": [
        "肉块",
        "排骨",
        "牛排",
        "猪排",
        "羊排"
      ]
    },
    {
      "unified": "1f953",
      "keywords": [
        "肉",
        "培根",
        "熏肉",
        "食物"
      ]
    },
    {
      "unified": "1f354",
      "keywords": [
        "汉堡",
        "汉堡包"
      ]
    },
    {
      "unified": "1f35f",
      "keywords": [
        "薯条",
        "油炸"
      ]
    },
    {
      "unified": "1f355",
      "keywords": [
        "披萨"
      ]
    },
    {
      "unified": "1f32d",
      "keywords": [
        "热狗"
      ]
    },
    {
      "unified": "1f96a",
      "keywords": [
        "面包",
        "三明治"
      ]
    },
    {
      "unified": "1f32e",
      "keywords": [
        "卷饼",
        "墨西哥",
        "墨西哥卷饼"
      ]
    },
    {
      "unified": "1f32f",
      "keywords": [
        "卷饼",
        "墨西哥",
        "玉米煎饼",
        "墨西哥玉米煎饼"
      ]
    },
    {
      "unified": "1fad4",
      "keywords": [
        "粽子",
        "墨西哥",
        "墨西哥粽子"
      ]
    },
    {
      "unified": "1f959",
      "keywords": [
        "夹心",
        "食物",
        "夹心饼",
        "肉夹馍",
        "沙拉三明治"
      ]
    },
    {
      "unified": "1f9c6",
      "keywords": [
        "肉丸",
        "鹰嘴豆",
        "炸豆丸子",
        "中东蔬菜球",
        "油炸鹰嘴豆饼"
      ]
    },
    {
      "unified": "1f95a",
      "keywords": [
        "蛋",
        "食物"
      ]
    },
    {
      "unified": "1f373",
      "keywords": [
        "煎",
        "蛋",
        "煎蛋",
        "平底锅"
      ]
    },
    {
      "unified": "1f958",
      "keywords": [
        "浅底",
        "煎锅",
        "食物",
        "装有食物的浅底锅"
      ]
    },
    {
      "unified": "1f372",
      "keywords": [
        "食物",
        "一锅食物"
      ]
    },
    {
      "unified": "1fad5",
      "keywords": [
        "锅",
        "奶酪",
        "瑞士",
        "融化",
        "巧克力",
        "奶酪火锅"
      ]
    },
    {
      "unified": "1f963",
      "keywords": [
        "粥",
        "碗勺",
        "早餐",
        "谷物"
      ]
    },
    {
      "unified": "1f957",
      "keywords": [
        "沙拉",
        "食物",
        "绿色沙拉"
      ]
    },
    {
      "unified": "1f37f",
      "keywords": [
        "爆米花"
      ]
    },
    {
      "unified": "1f9c8",
      "keywords": [
        "黄油",
        "牛奶",
        "乳制品"
      ]
    },
    {
      "unified": "1f9c2",
      "keywords": [
        "盐",
        "佐料瓶",
        "调味品"
      ]
    },
    {
      "unified": "1f96b",
      "keywords": [
        "罐头",
        "罐头食品"
      ]
    },
    {
      "unified": "1f371",
      "keywords": [
        "盒饭",
        "便当"
      ]
    },
    {
      "unified": "1f358",
      "keywords": [
        "米饼",
        "米果"
      ]
    },
    {
      "unified": "1f359",
      "keywords": [
        "饭团",
        "日本"
      ]
    },
    {
      "unified": "1f35a",
      "keywords": [
        "米",
        "饭",
        "米饭"
      ]
    },
    {
      "unified": "1f35b",
      "keywords": [
        "饭",
        "咖喱",
        "咖喱饭"
      ]
    },
    {
      "unified": "1f35c",
      "keywords": [
        "碗",
        "面条",
        "拉面",
        "热气腾腾"
      ]
    },
    {
      "unified": "1f35d",
      "keywords": [
        "意粉",
        "意面",
        "意大利面"
      ]
    },
    {
      "unified": "1f360",
      "keywords": [
        "地瓜",
        "红薯",
        "烤红薯",
        "烤地瓜"
      ]
    },
    {
      "unified": "1f362",
      "keywords": [
        "串",
        "海鲜",
        "关东煮"
      ]
    },
    {
      "unified": "1f363",
      "keywords": [
        "寿司"
      ]
    },
    {
      "unified": "1f364",
      "keywords": [
        "炸虾",
        "天妇罗"
      ]
    },
    {
      "unified": "1f365",
      "keywords": [
        "鱼板"
      ]
    },
    {
      "unified": "1f96e",
      "keywords": [
        "月饼",
        "秋天",
        "节日"
      ]
    },
    {
      "unified": "1f361",
      "keywords": [
        "串",
        "团子",
        "日本",
        "甜点"
      ]
    },
    {
      "unified": "1f95f",
      "keywords": [
        "饺子",
        "水饺",
        "煎饺"
      ]
    },
    {
      "unified": "1f960",
      "keywords": [
        "预言",
        "幸运饼干"
      ]
    },
    {
      "unified": "1f961",
      "keywords": [
        "外卖盒",
        "外卖桶",
        "牡蛎桶",
        "外卖包装"
      ]
    },
    {
      "unified": "1f980",
      "keywords": [
        "蟹",
        "螃蟹",
        "巨蟹座",
        "黄道十二宫"
      ]
    },
    {
      "unified": "1f99e",
      "keywords": [
        "钳",
        "龙虾",
        "浓汤",
        "海鲜"
      ]
    },
    {
      "unified": "1f990",
      "keywords": [
        "虾",
        "甲壳",
        "食物"
      ]
    },
    {
      "unified": "1f991",
      "keywords": [
        "乌贼",
        "墨鱼",
        "食物",
        "鱿鱼",
        "软体动物"
      ]
    },
    {
      "unified": "1f9aa",
      "keywords": [
        "牡蛎",
        "海鲜",
        "珍珠",
        "生蚝"
      ]
    },
    {
      "unified": "1f366",
      "keywords": [
        "圆筒冰激凌",
        "圆筒冰淇淋"
      ]
    },
    {
      "unified": "1f367",
      "keywords": [
        "冰",
        "刨冰",
        "冰沙",
        "甜点"
      ]
    },
    {
      "unified": "1f368",
      "keywords": [
        "冰",
        "甜点",
        "冰淇淋",
        "冰激凌"
      ]
    },
    {
      "unified": "1f369",
      "keywords": [
        "甜点",
        "甜甜圈"
      ]
    },
    {
      "unified": "1f36a",
      "keywords": [
        "饼干",
        "曲奇"
      ]
    },
    {
      "unified": "1f382",
      "keywords": [
        "庆祝",
        "生日",
        "蛋糕",
        "生日蛋糕"
      ]
    },
    {
      "unified": "1f370",
      "keywords": [
        "甜点",
        "蛋糕",
        "水果蛋糕"
      ]
    },
    {
      "unified": "1f9c1",
      "keywords": [
        "甜点",
        "纸杯蛋糕",
        "烘焙食品"
      ]
    },
    {
      "unified": "1f967",
      "keywords": [
        "派",
        "糕点",
        "油酥点心"
      ]
    },
    {
      "unified": "1f36b",
      "keywords": [
        "甜品",
        "甜点",
        "巧克力"
      ]
    },
    {
      "unified": "1f36c",
      "keywords": [
        "糖",
        "糖果"
      ]
    },
    {
      "unified": "1f36d",
      "keywords": [
        "糖",
        "棒棒糖"
      ]
    },
    {
      "unified": "1f36e",
      "keywords": [
        "奶黄",
        "蛋奶冻",
        "蛋奶沙司"
      ]
    },
    {
      "unified": "1f36f",
      "keywords": [
        "蜂蜜",
        "蜜罐"
      ]
    },
    {
      "unified": "1f37c",
      "keywords": [
        "奶",
        "奶瓶",
        "婴儿"
      ]
    },
    {
      "unified": "1f95b",
      "keywords": [
        "奶",
        "杯",
        "一杯奶"
      ]
    },
    {
      "unified": "2615",
      "keywords": [
        "茶",
        "热饮",
        "咖啡",
        "饮料"
      ]
    },
    {
      "unified": "1fad6",
      "keywords": [
        "壶",
        "茶",
        "茶壶"
      ]
    },
    {
      "unified": "1f375",
      "keywords": [
        "杯",
        "茶",
        "热茶",
        "饮料",
        "没有把手的茶杯"
      ]
    },
    {
      "unified": "1f376",
      "keywords": [
        "瓶",
        "清酒",
        "酒杯",
        "饮料"
      ]
    },
    {
      "unified": "1f37e",
      "keywords": [
        "庆祝",
        "木塞",
        "瓶子",
        "香槟",
        "开香槟"
      ]
    },
    {
      "unified": "1f377",
      "keywords": [
        "酒",
        "酒杯",
        "葡萄酒"
      ]
    },
    {
      "unified": "1f378",
      "keywords": [
        "杯",
        "酒",
        "鸡尾酒"
      ]
    },
    {
      "unified": "1f379",
      "keywords": [
        "饮料",
        "热带水果饮料"
      ]
    },
    {
      "unified": "1f37a",
      "keywords": [
        "杯",
        "酒",
        "啤酒"
      ]
    },
    {
      "unified": "1f37b",
      "keywords": [
        "酒",
        "干杯",
        "啤酒",
        "碰杯"
      ]
    },
    {
      "unified": "1f942",
      "keywords": [
        "喝",
        "杯",
        "碰杯",
        "庆祝"
      ]
    },
    {
      "unified": "1f943",
      "keywords": [
        "杯",
        "酒",
        "平底杯",
        "威士忌"
      ]
    },
    {
      "unified": "1fad7",
      "keywords": [
        "空",
        "流出",
        "饮料",
        "玻璃杯",
        "倾倒液体"
      ]
    },
    {
      "unified": "1f964",
      "keywords": [
        "果汁",
        "苏打",
        "带吸管杯"
      ]
    },
    {
      "unified": "1f9cb",
      "keywords": [
        "茶",
        "泡泡",
        "牛奶",
        "珍珠",
        "珍珠奶茶"
      ]
    },
    {
      "unified": "1f9c3",
      "keywords": [
        "吸管",
        "盒装",
        "饮料盒",
        "果汁盒"
      ]
    },
    {
      "unified": "1f9c9",
      "keywords": [
        "茶",
        "饮料",
        "马黛茶"
      ]
    },
    {
      "unified": "1f9ca",
      "keywords": [
        "冰块",
        "冰山",
        "冷却",
        "冷饮"
      ]
    },
    {
      "unified": "1f962",
      "keywords": [
        "箸",
        "筷子"
      ]
    },
    {
      "unified": "1f37d-fe0f",
      "keywords": [
        "刀",
        "叉",
        "盘",
        "餐具"
      ]
    },
    {
      "unified": "1f374",
      "keywords": [
        "刀",
        "叉",
        "刀叉",
        "餐具"
      ]
    },
    {
      "unified": "1f944",
      "keywords": [
        "匙",
        "匙子",
        "汤匙",
        "调羹",
        "餐具"
      ]
    },
    {
      "unified": "1f52a",
      "keywords": [
        "刀",
        "菜刀",
        "武器",
        "烹饪"
      ]
    },
    {
      "unified": "1fad9",
      "keywords": [
        "罐",
        "空",
        "酱",
        "容器",
        "贮藏",
        "调味品"
      ]
    },
    {
      "unified": "1f3fa",
      "keywords": [
        "壶",
        "罐",
        "双耳瓶"
      ]
    }
  ],
  "activities": [
    {
      "unified": "1f383",
      "keywords": [
        "庆祝",
        "灯笼",
        "南瓜灯",
        "万圣节"
      ]
    },
    {
      "unified": "1f384",
      "keywords": [
        "树",
        "圣诞",
        "庆祝",
        "圣诞树"
      ]
    },
    {
      "unified": "1f386",
      "keywords": [
        "焰火",
        "庆祝",
        "烟花"
      ]
    },
    {
      "unified": "1f387",
      "keywords": [
        "烟花",
        "庆祝",
        "火花",
        "烟火",
        "焰火"
      ]
    },
    {
      "unified": "1f9e8",
      "keywords": [
        "爆竹",
        "炸药",
        "烟花",
        "爆炸"
      ]
    },
    {
      "unified": "2728",
      "keywords": [
        "闪亮",
        "星星",
        "火花",
        "闪光",
        "闪耀"
      ]
    },
    {
      "unified": "1f388",
      "keywords": [
        "气球",
        "庆祝"
      ]
    },
    {
      "unified": "1f389",
      "keywords": [
        "庆祝",
        "彩带",
        "派对",
        "拉炮彩带",
        "派对礼宾花"
      ]
    },
    {
      "unified": "1f38a",
      "keywords": [
        "球",
        "庆祝",
        "五彩纸屑球"
      ]
    },
    {
      "unified": "1f38b",
      "keywords": [
        "树",
        "七夕",
        "庆祝",
        "日本",
        "七夕树"
      ]
    },
    {
      "unified": "1f38d",
      "keywords": [
        "竹",
        "门松",
        "庆祝",
        "日本",
        "松树",
        "盆栽"
      ]
    },
    {
      "unified": "1f38e",
      "keywords": [
        "人偶",
        "庆祝",
        "节日",
        "日本人形"
      ]
    },
    {
      "unified": "1f38f",
      "keywords": [
        "庆祝",
        "日本",
        "长旗",
        "鲤鱼旗",
        "男孩节"
      ]
    },
    {
      "unified": "1f390",
      "keywords": [
        "风铃",
        "庆祝",
        "铃铛"
      ]
    },
    {
      "unified": "1f391",
      "keywords": [
        "赏月",
        "中秋",
        "庆祝",
        "月亮"
      ]
    },
    {
      "unified": "1f9e7",
      "keywords": [
        "钱",
        "红包",
        "利是",
        "礼物",
        "运气"
      ]
    },
    {
      "unified": "1f380",
      "keywords": [
        "丝带",
        "庆祝",
        "缎带",
        "蝴蝶结"
      ]
    },
    {
      "unified": "1f381",
      "keywords": [
        "礼物",
        "包装",
        "庆祝",
        "盒子",
        "礼品"
      ]
    },
    {
      "unified": "1f397-fe0f",
      "keywords": [
        "丝带",
        "庆祝",
        "暗示",
        "提示丝带"
      ]
    },
    {
      "unified": "1f39f-fe0f",
      "keywords": [
        "票",
        "门票",
        "入场券"
      ]
    },
    {
      "unified": "1f3ab",
      "keywords": [
        "票",
        "车票",
        "门票",
        "入场券",
        "电影票"
      ]
    },
    {
      "unified": "1f396-fe0f",
      "keywords": [
        "军队",
        "勋章",
        "奖章",
        "军功章"
      ]
    },
    {
      "unified": "1f3c6",
      "keywords": [
        "奖杯",
        "奖励",
        "奖品",
        "奖赏"
      ]
    },
    {
      "unified": "1f3c5",
      "keywords": [
        "奖牌",
        "运动会奖牌"
      ]
    },
    {
      "unified": "1f947",
      "keywords": [
        "金牌",
        "奖牌",
        "第一"
      ]
    },
    {
      "unified": "1f948",
      "keywords": [
        "银牌",
        "奖牌",
        "第二"
      ]
    },
    {
      "unified": "1f949",
      "keywords": [
        "铜牌",
        "奖牌",
        "第三"
      ]
    },
    {
      "unified": "26bd",
      "keywords": [
        "球",
        "足球",
        "英式足球"
      ]
    },
    {
      "unified": "26be",
      "keywords": [
        "球",
        "棒球"
      ]
    },
    {
      "unified": "1f94e",
      "keywords": [
        "球",
        "垒球",
        "手套",
        "腋下"
      ]
    },
    {
      "unified": "1f3c0",
      "keywords": [
        "球",
        "篮球",
        "篮筐"
      ]
    },
    {
      "unified": "1f3d0",
      "keywords": [
        "球",
        "排球"
      ]
    },
    {
      "unified": "1f3c8",
      "keywords": [
        "球",
        "橄榄球",
        "美式橄榄球"
      ]
    },
    {
      "unified": "1f3c9",
      "keywords": [
        "球",
        "橄榄球",
        "英式橄榄球"
      ]
    },
    {
      "unified": "1f3be",
      "keywords": [
        "球",
        "网球",
        "球拍"
      ]
    },
    {
      "unified": "1f94f",
      "keywords": [
        "飞盘",
        "极限",
        "终极",
        "极限运动"
      ]
    },
    {
      "unified": "1f3b3",
      "keywords": [
        "球",
        "保龄球"
      ]
    },
    {
      "unified": "1f3cf",
      "keywords": [
        "球",
        "板球",
        "球拍"
      ]
    },
    {
      "unified": "1f3d1",
      "keywords": [
        "球",
        "球棍",
        "曲棍球"
      ]
    },
    {
      "unified": "1f3d2",
      "keywords": [
        "球",
        "冰球",
        "球棍"
      ]
    },
    {
      "unified": "1f94d",
      "keywords": [
        "球",
        "球棍",
        "球门",
        "袋棍球"
      ]
    },
    {
      "unified": "1f3d3",
      "keywords": [
        "球",
        "比赛",
        "球拍",
        "乒乓球"
      ]
    },
    {
      "unified": "1f3f8",
      "keywords": [
        "球拍",
        "羽毛球"
      ]
    },
    {
      "unified": "1f94a",
      "keywords": [
        "手套",
        "拳击手套"
      ]
    },
    {
      "unified": "1f94b",
      "keywords": [
        "制服",
        "柔道",
        "武术",
        "练武服",
        "空手道",
        "跆拳道"
      ]
    },
    {
      "unified": "1f945",
      "keywords": [
        "球门",
        "球网"
      ]
    },
    {
      "unified": "26f3",
      "keywords": [
        "高尔夫",
        "高尔夫球洞"
      ]
    },
    {
      "unified": "26f8-fe0f",
      "keywords": [
        "滑冰",
        "冰刀",
        "溜冰"
      ]
    },
    {
      "unified": "1f3a3",
      "keywords": [
        "鱼杆",
        "钓鱼竿"
      ]
    },
    {
      "unified": "1f93f",
      "keywords": [
        "浮潜",
        "深潜",
        "潜水",
        "潜水面罩"
      ]
    },
    {
      "unified": "1f3bd",
      "keywords": [
        "上衣",
        "跑步",
        "运动背心"
      ]
    },
    {
      "unified": "1f3bf",
      "keywords": [
        "雪",
        "滑雪"
      ]
    },
    {
      "unified": "1f6f7",
      "keywords": [
        "雪橇",
        "乘雪橇",
        "驾雪橇"
      ]
    },
    {
      "unified": "1f94c",
      "keywords": [
        "冰壶",
        "比赛",
        "游戏",
        "冰上溜石"
      ]
    },
    {
      "unified": "1f3af",
      "keywords": [
        "命中",
        "靶心",
        "飞镖",
        "正中靶心的飞镖"
      ]
    },
    {
      "unified": "1fa80",
      "keywords": [
        "玩具",
        "悠悠球",
        "上下起落"
      ]
    },
    {
      "unified": "1fa81",
      "keywords": [
        "风筝",
        "翱翔",
        "飞翔"
      ]
    },
    {
      "unified": "1f52b",
      "keywords": [
        "枪",
        "水枪",
        "工具",
        "左轮",
        "手枪",
        "武器"
      ]
    },
    {
      "unified": "1f3b1",
      "keywords": [
        "台球",
        "游戏",
        "霹雳八球",
        "8 球制桌球"
      ]
    },
    {
      "unified": "1f52e",
      "keywords": [
        "球",
        "命运",
        "工具",
        "水晶",
        "财富",
        "水晶球"
      ]
    },
    {
      "unified": "1fa84",
      "keywords": [
        "魔棒",
        "女巫",
        "巫师",
        "魔法"
      ]
    },
    {
      "unified": "1f3ae",
      "keywords": [
        "手柄",
        "游戏手柄",
        "电子游戏"
      ]
    },
    {
      "unified": "1f579-fe0f",
      "keywords": [
        "操控杆",
        "电子游戏",
        "游戏操控杆"
      ]
    },
    {
      "unified": "1f3b0",
      "keywords": [
        "游戏",
        "赌博",
        "老虎机",
        "角子机"
      ]
    },
    {
      "unified": "1f3b2",
      "keywords": [
        "骰子",
        "色子"
      ]
    },
    {
      "unified": "1f9e9",
      "keywords": [
        "拼图",
        "图片",
        "线索",
        "联锁",
        "智力游戏"
      ]
    },
    {
      "unified": "1f9f8",
      "keywords": [
        "填充",
        "玩偶",
        "玩具",
        "泰迪熊",
        "毛绒玩具"
      ]
    },
    {
      "unified": "1fa85",
      "keywords": [
        "彩罐",
        "庆祝",
        "聚会"
      ]
    },
    {
      "unified": "1faa9",
      "keywords": [
        "镜球",
        "聚会",
        "舞蹈",
        "闪耀",
        "迪斯科"
      ]
    },
    {
      "unified": "1fa86",
      "keywords": [
        "套娃",
        "娃娃",
        "俄罗斯套娃"
      ]
    },
    {
      "unified": "2660-fe0f",
      "keywords": [
        "牌",
        "黑桃",
        "扑克",
        "葵扇"
      ]
    },
    {
      "unified": "2665-fe0f",
      "keywords": [
        "牌",
        "红桃",
        "扑克",
        "红心"
      ]
    },
    {
      "unified": "2666-fe0f",
      "keywords": [
        "牌",
        "方片",
        "扑克",
        "方块"
      ]
    },
    {
      "unified": "2663-fe0f",
      "keywords": [
        "牌",
        "梅花",
        "扑克",
        "草花"
      ]
    },
    {
      "unified": "265f-fe0f",
      "keywords": [
        "兵",
        "受骗者",
        "牺牲品",
        "国际象棋"
      ]
    },
    {
      "unified": "1f0cf",
      "keywords": [
        "牌",
        "大王",
        "小王",
        "扑克",
        "鬼牌",
        "大小王"
      ]
    },
    {
      "unified": "1f004",
      "keywords": [
        "红中",
        "麻将"
      ]
    },
    {
      "unified": "1f3b4",
      "keywords": [
        "花札",
        "卡牌",
        "日本",
        "游戏",
        "花牌"
      ]
    },
    {
      "unified": "1f3ad",
      "keywords": [
        "剧院",
        "戏剧",
        "艺术",
        "表演",
        "面具",
        "表演艺术"
      ]
    },
    {
      "unified": "1f5bc-fe0f",
      "keywords": [
        "框",
        "画",
        "艺术",
        "博物馆",
        "带框的画"
      ]
    },
    {
      "unified": "1f3a8",
      "keywords": [
        "画画",
        "艺术",
        "调色盘",
        "博物馆",
        "调色板"
      ]
    },
    {
      "unified": "1f9f5",
      "keywords": [
        "线",
        "针",
        "线轴",
        "绳子",
        "缝纫"
      ]
    },
    {
      "unified": "1faa1",
      "keywords": [
        "缝合",
        "缝纫",
        "缝线",
        "裁剪",
        "缝合针",
        "绣花针"
      ]
    },
    {
      "unified": "1f9f6",
      "keywords": [
        "毛线",
        "编织",
        "毛线球",
        "钩针编织物"
      ]
    },
    {
      "unified": "1faa2",
      "keywords": [
        "结",
        "打结",
        "绳子",
        "缠结",
        "麻线"
      ]
    }
  ],
  "travel_places": [
    {
      "unified": "1f30d",
      "keywords": [
        "世界",
        "地球",
        "欧洲",
        "非洲",
        "地球上的欧洲非洲"
      ]
    },
    {
      "unified": "1f30e",
      "keywords": [
        "世界",
        "地球",
        "美洲",
        "地球上的美洲"
      ]
    },
    {
      "unified": "1f30f",
      "keywords": [
        "世界",
        "亚洲",
        "地球",
        "澳洲",
        "地球上的亚洲澳洲"
      ]
    },
    {
      "unified": "1f310",
      "keywords": [
        "世界",
        "地球",
        "经纬",
        "子午线",
        "带经纬线的地球"
      ]
    },
    {
      "unified": "1f5fa-fe0f",
      "keywords": [
        "世界",
        "地图",
        "世界地图"
      ]
    },
    {
      "unified": "1f5fe",
      "keywords": [
        "地图",
        "日本",
        "日本地图"
      ]
    },
    {
      "unified": "1f9ed",
      "keywords": [
        "定向",
        "导航",
        "磁性",
        "指南针"
      ]
    },
    {
      "unified": "1f3d4-fe0f",
      "keywords": [
        "冷",
        "山",
        "雪",
        "雪山"
      ]
    },
    {
      "unified": "26f0-fe0f",
      "keywords": [
        "山"
      ]
    },
    {
      "unified": "1f30b",
      "keywords": [
        "山",
        "火山",
        "喷发",
        "爆发"
      ]
    },
    {
      "unified": "1f5fb",
      "keywords": [
        "山",
        "富士山"
      ]
    },
    {
      "unified": "1f3d5-fe0f",
      "keywords": [
        "露营",
        "帐篷"
      ]
    },
    {
      "unified": "1f3d6-fe0f",
      "keywords": [
        "伞",
        "沙滩",
        "沙滩伞"
      ]
    },
    {
      "unified": "1f3dc-fe0f",
      "keywords": [
        "沙漠",
        "荒漠"
      ]
    },
    {
      "unified": "1f3dd-fe0f",
      "keywords": [
        "荒岛",
        "无人荒岛"
      ]
    },
    {
      "unified": "1f3de-fe0f",
      "keywords": [
        "公园",
        "自然",
        "风景",
        "国家公园"
      ]
    },
    {
      "unified": "1f3df-fe0f",
      "keywords": [
        "体育馆"
      ]
    },
    {
      "unified": "1f3db-fe0f",
      "keywords": [
        "古典",
        "古建筑",
        "古典建筑"
      ]
    },
    {
      "unified": "1f3d7-fe0f",
      "keywords": [
        "施工"
      ]
    },
    {
      "unified": "1f9f1",
      "keywords": [
        "砖",
        "墙",
        "砂浆",
        "黏土"
      ]
    },
    {
      "unified": "1faa8",
      "keywords": [
        "岩石",
        "固体",
        "巨石",
        "石头"
      ]
    },
    {
      "unified": "1fab5",
      "keywords": [
        "木头",
        "原木",
        "木材"
      ]
    },
    {
      "unified": "1f6d6",
      "keywords": [
        "小屋",
        "圆屋",
        "蒙古包"
      ]
    },
    {
      "unified": "1f3d8-fe0f",
      "keywords": [
        "房",
        "住宅",
        "房屋建筑"
      ]
    },
    {
      "unified": "1f3da-fe0f",
      "keywords": [
        "废墟",
        "荒宅",
        "荒废",
        "鬼屋"
      ]
    },
    {
      "unified": "1f3e0",
      "keywords": [
        "家",
        "房子"
      ]
    },
    {
      "unified": "1f3e1",
      "keywords": [
        "家",
        "别墅",
        "房子",
        "花园"
      ]
    },
    {
      "unified": "1f3e2",
      "keywords": [
        "办公楼",
        "写字楼"
      ]
    },
    {
      "unified": "1f3e3",
      "keywords": [
        "日本",
        "邮局",
        "日本邮局"
      ]
    },
    {
      "unified": "1f3e4",
      "keywords": [
        "邮局",
        "欧洲"
      ]
    },
    {
      "unified": "1f3e5",
      "keywords": [
        "医院",
        "医生",
        "看病"
      ]
    },
    {
      "unified": "1f3e6",
      "keywords": [
        "银行"
      ]
    },
    {
      "unified": "1f3e8",
      "keywords": [
        "酒店",
        "旅馆"
      ]
    },
    {
      "unified": "1f3e9",
      "keywords": [
        "情人酒店",
        "情人旅馆",
        "情侣酒店"
      ]
    },
    {
      "unified": "1f3ea",
      "keywords": [
        "商店",
        "便利店"
      ]
    },
    {
      "unified": "1f3eb",
      "keywords": [
        "学校",
        "教学楼"
      ]
    },
    {
      "unified": "1f3ec",
      "keywords": [
        "商场",
        "百货商店"
      ]
    },
    {
      "unified": "1f3ed",
      "keywords": [
        "工厂",
        "建筑"
      ]
    },
    {
      "unified": "1f3ef",
      "keywords": [
        "城堡",
        "日本",
        "日本城堡"
      ]
    },
    {
      "unified": "1f3f0",
      "keywords": [
        "城堡",
        "欧洲",
        "欧洲城堡"
      ]
    },
    {
      "unified": "1f492",
      "keywords": [
        "婚礼",
        "教堂",
        "浪漫",
        "结婚"
      ]
    },
    {
      "unified": "1f5fc",
      "keywords": [
        "塔",
        "东京",
        "东京塔"
      ]
    },
    {
      "unified": "1f5fd",
      "keywords": [
        "自由",
        "雕塑",
        "自由女神像"
      ]
    },
    {
      "unified": "26ea",
      "keywords": [
        "教堂",
        "基督",
        "宗教"
      ]
    },
    {
      "unified": "1f54c",
      "keywords": [
        "宗教",
        "清真寺",
        "伊斯兰",
        "穆斯林"
      ]
    },
    {
      "unified": "1f6d5",
      "keywords": [
        "佛寺",
        "佛教",
        "寺庙",
        "寺院",
        "庙宇",
        "印度寺庙"
      ]
    },
    {
      "unified": "1f54d",
      "keywords": [
        "会堂",
        "宗教",
        "犹太",
        "犹太教堂"
      ]
    },
    {
      "unified": "26e9-fe0f",
      "keywords": [
        "神社",
        "宗教",
        "日本",
        "神道教"
      ]
    },
    {
      "unified": "1f54b",
      "keywords": [
        "天房",
        "宗教",
        "克尔白",
        "伊斯兰",
        "穆斯林"
      ]
    },
    {
      "unified": "26f2",
      "keywords": [
        "喷泉"
      ]
    },
    {
      "unified": "26fa",
      "keywords": [
        "帐篷",
        "露营"
      ]
    },
    {
      "unified": "1f301",
      "keywords": [
        "雾",
        "霾",
        "有雾"
      ]
    },
    {
      "unified": "1f303",
      "keywords": [
        "夜晚",
        "星空",
        "晚上"
      ]
    },
    {
      "unified": "1f3d9-fe0f",
      "keywords": [
        "都市",
        "城市风光",
        "都市景观",
        "高楼大厦"
      ]
    },
    {
      "unified": "1f304",
      "keywords": [
        "山",
        "太阳",
        "日出",
        "清晨",
        "山顶日出"
      ]
    },
    {
      "unified": "1f305",
      "keywords": [
        "日出",
        "太阳",
        "清晨"
      ]
    },
    {
      "unified": "1f306",
      "keywords": [
        "夜晚",
        "日落",
        "都市",
        "黄昏",
        "城市黄昏"
      ]
    },
    {
      "unified": "1f307",
      "keywords": [
        "日落",
        "夕阳"
      ]
    },
    {
      "unified": "1f309",
      "keywords": [
        "桥",
        "晚上",
        "夜幕下的桥"
      ]
    },
    {
      "unified": "2668-fe0f",
      "keywords": [
        "水",
        "泉",
        "温泉",
        "热气腾腾"
      ]
    },
    {
      "unified": "1f3a0",
      "keywords": [
        "木马",
        "游乐园",
        "旋转木马"
      ]
    },
    {
      "unified": "1f6dd",
      "keywords": [
        "玩耍",
        "游乐园",
        "游乐场滑梯"
      ]
    },
    {
      "unified": "1f3a1",
      "keywords": [
        "摩天轮",
        "游乐园"
      ]
    },
    {
      "unified": "1f3a2",
      "keywords": [
        "过山车",
        "游乐园"
      ]
    },
    {
      "unified": "1f488",
      "keywords": [
        "柱",
        "旋转",
        "理发",
        "理发店"
      ]
    },
    {
      "unified": "1f3aa",
      "keywords": [
        "帐篷",
        "马戏团",
        "马戏团帐篷"
      ]
    },
    {
      "unified": "1f682",
      "keywords": [
        "火车",
        "蒸汽",
        "蒸汽火车"
      ]
    },
    {
      "unified": "1f683",
      "keywords": [
        "电车",
        "轨道车"
      ]
    },
    {
      "unified": "1f684",
      "keywords": [
        "动车",
        "火车",
        "高铁",
        "新干线",
        "高速列车"
      ]
    },
    {
      "unified": "1f685",
      "keywords": [
        "动车",
        "火车",
        "高速",
        "高铁",
        "新干线",
        "子弹头高速列车"
      ]
    },
    {
      "unified": "1f686",
      "keywords": [
        "火车",
        "铁路"
      ]
    },
    {
      "unified": "1f687",
      "keywords": [
        "地铁"
      ]
    },
    {
      "unified": "1f688",
      "keywords": [
        "轻轨",
        "火车"
      ]
    },
    {
      "unified": "1f689",
      "keywords": [
        "车站",
        "火车",
        "铁路"
      ]
    },
    {
      "unified": "1f68a",
      "keywords": [
        "电车",
        "路面电车"
      ]
    },
    {
      "unified": "1f69d",
      "keywords": [
        "单轨",
        "火车"
      ]
    },
    {
      "unified": "1f69e",
      "keywords": [
        "山区",
        "火车",
        "铁路",
        "山区铁路"
      ]
    },
    {
      "unified": "1f68b",
      "keywords": [
        "有轨电车"
      ]
    },
    {
      "unified": "1f68c",
      "keywords": [
        "大巴",
        "公交车",
        "公共汽车"
      ]
    },
    {
      "unified": "1f68d",
      "keywords": [
        "大巴",
        "公共汽车",
        "迎面驶来",
        "迎面驶来的公交车"
      ]
    },
    {
      "unified": "1f68e",
      "keywords": [
        "电车",
        "无轨电车"
      ]
    },
    {
      "unified": "1f690",
      "keywords": [
        "小巴",
        "公共汽车"
      ]
    },
    {
      "unified": "1f691",
      "keywords": [
        "急救",
        "救护车"
      ]
    },
    {
      "unified": "1f692",
      "keywords": [
        "消防车",
        "救火车"
      ]
    },
    {
      "unified": "1f693",
      "keywords": [
        "警车",
        "巡逻",
        "警察"
      ]
    },
    {
      "unified": "1f694",
      "keywords": [
        "警察",
        "警车",
        "迎面驶来的警车"
      ]
    },
    {
      "unified": "1f695",
      "keywords": [
        "的士",
        "出租车"
      ]
    },
    {
      "unified": "1f696",
      "keywords": [
        "的士",
        "出租车",
        "迎面驶来的出租车"
      ]
    },
    {
      "unified": "1f697",
      "keywords": [
        "汽车",
        "轿车"
      ]
    },
    {
      "unified": "1f698",
      "keywords": [
        "轿车",
        "迎面驶来的汽车"
      ]
    },
    {
      "unified": "1f699",
      "keywords": [
        "suv",
        "休闲车",
        "运动型多用途车"
      ]
    },
    {
      "unified": "1f6fb",
      "keywords": [
        "卡车",
        "载货",
        "敞蓬小型载货卡车"
      ]
    },
    {
      "unified": "1f69a",
      "keywords": [
        "货车",
        "卡车"
      ]
    },
    {
      "unified": "1f69b",
      "keywords": [
        "卡车",
        "拖车",
        "铰接式货车"
      ]
    },
    {
      "unified": "1f69c",
      "keywords": [
        "拖拉机"
      ]
    },
    {
      "unified": "1f3ce-fe0f",
      "keywords": [
        "赛车",
        "跑车"
      ]
    },
    {
      "unified": "1f3cd-fe0f",
      "keywords": [
        "摩托",
        "摩托车"
      ]
    },
    {
      "unified": "1f6f5",
      "keywords": [
        "小型摩托车"
      ]
    },
    {
      "unified": "1f9bd",
      "keywords": [
        "轮椅",
        "无障碍",
        "手动轮椅"
      ]
    },
    {
      "unified": "1f9bc",
      "keywords": [
        "轮椅",
        "无障碍",
        "电动轮椅"
      ]
    },
    {
      "unified": "1f6fa",
      "keywords": [
        "三脚鸡",
        "三蹦子",
        "嘟嘟车",
        "三轮摩托车",
        "自动人力车"
      ]
    },
    {
      "unified": "1f6b2",
      "keywords": [
        "单车",
        "自行车",
        "脚踏车"
      ]
    },
    {
      "unified": "1f6f4",
      "keywords": [
        "滑板车"
      ]
    },
    {
      "unified": "1f6f9",
      "keywords": [
        "板",
        "滑板"
      ]
    },
    {
      "unified": "1f6fc",
      "keywords": [
        "滑冰",
        "轮式",
        "四轮滑冰鞋"
      ]
    },
    {
      "unified": "1f68f",
      "keywords": [
        "公交站",
        "公交车站",
        "公共汽车站"
      ]
    },
    {
      "unified": "1f6e3-fe0f",
      "keywords": [
        "公路",
        "高速公路"
      ]
    },
    {
      "unified": "1f6e4-fe0f",
      "keywords": [
        "铁轨",
        "火车",
        "铁路"
      ]
    },
    {
      "unified": "1f6e2-fe0f",
      "keywords": [
        "桶",
        "石油桶"
      ]
    },
    {
      "unified": "26fd",
      "keywords": [
        "油泵",
        "柴油",
        "燃油",
        "加油站"
      ]
    },
    {
      "unified": "1f6de",
      "keywords": [
        "车轮",
        "圆圈",
        "转动",
        "轮胎"
      ]
    },
    {
      "unified": "1f6a8",
      "keywords": [
        "灯",
        "警报",
        "警灯",
        "警示",
        "警车灯"
      ]
    },
    {
      "unified": "1f6a5",
      "keywords": [
        "交通灯",
        "信号灯",
        "红绿灯",
        "横向的红绿灯"
      ]
    },
    {
      "unified": "1f6a6",
      "keywords": [
        "交通灯",
        "信号灯",
        "红绿灯",
        "纵向的红绿灯"
      ]
    },
    {
      "unified": "1f6d1",
      "keywords": [
        "标志",
        "八边形",
        "停止标志"
      ]
    },
    {
      "unified": "1f6a7",
      "keywords": [
        "路障",
        "施工"
      ]
    },
    {
      "unified": "2693",
      "keywords": [
        "锚",
        "船",
        "停泊"
      ]
    },
    {
      "unified": "1f6df",
      "keywords": [
        "安全",
        "救援",
        "漂浮",
        "救生圈",
        "救生用具"
      ]
    },
    {
      "unified": "26f5",
      "keywords": [
        "船",
        "帆船"
      ]
    },
    {
      "unified": "1f6f6",
      "keywords": [
        "独木舟"
      ]
    },
    {
      "unified": "1f6a4",
      "keywords": [
        "船",
        "快艇"
      ]
    },
    {
      "unified": "1f6f3-fe0f",
      "keywords": [
        "客轮",
        "客船"
      ]
    },
    {
      "unified": "26f4-fe0f",
      "keywords": [
        "渡轮",
        "渡船",
        "轮船"
      ]
    },
    {
      "unified": "1f6e5-fe0f",
      "keywords": [
        "船",
        "摩托艇"
      ]
    },
    {
      "unified": "1f6a2",
      "keywords": [
        "船"
      ]
    },
    {
      "unified": "2708-fe0f",
      "keywords": [
        "飞机"
      ]
    },
    {
      "unified": "1f6e9-fe0f",
      "keywords": [
        "飞机",
        "小型飞机"
      ]
    },
    {
      "unified": "1f6eb",
      "keywords": [
        "值机",
        "登机",
        "起飞",
        "航班起飞"
      ]
    },
    {
      "unified": "1f6ec",
      "keywords": [
        "到达",
        "降落",
        "航班降落"
      ]
    },
    {
      "unified": "1fa82",
      "keywords": [
        "帆伞",
        "滑翔",
        "跳伞",
        "降落伞",
        "滑翔伞",
        "悬挂滑翔"
      ]
    },
    {
      "unified": "1f4ba",
      "keywords": [
        "座位",
        "椅子"
      ]
    },
    {
      "unified": "1f681",
      "keywords": [
        "直升机",
        "直升飞机"
      ]
    },
    {
      "unified": "1f69f",
      "keywords": [
        "空轨",
        "悬挂",
        "空中轨道列车"
      ]
    },
    {
      "unified": "1f6a0",
      "keywords": [
        "缆车",
        "空中",
        "索道"
      ]
    },
    {
      "unified": "1f6a1",
      "keywords": [
        "索道",
        "空中",
        "缆车"
      ]
    },
    {
      "unified": "1f6f0-fe0f",
      "keywords": [
        "卫星",
        "太空"
      ]
    },
    {
      "unified": "1f680",
      "keywords": [
        "火箭",
        "太空"
      ]
    },
    {
      "unified": "1f6f8",
      "keywords": [
        "飞碟",
        "ufo",
        "不明飞行物"
      ]
    },
    {
      "unified": "1f6ce-fe0f",
      "keywords": [
        "铃",
        "酒店",
        "服务铃"
      ]
    },
    {
      "unified": "1f9f3",
      "keywords": [
        "包装",
        "旅行",
        "行李箱"
      ]
    },
    {
      "unified": "231b",
      "keywords": [
        "沙漏",
        "计时器"
      ]
    },
    {
      "unified": "23f3",
      "keywords": [
        "计时器",
        "沙正往下流的沙漏"
      ]
    },
    {
      "unified": "231a",
      "keywords": [
        "表",
        "手表"
      ]
    },
    {
      "unified": "23f0",
      "keywords": [
        "钟",
        "闹钟"
      ]
    },
    {
      "unified": "23f1-fe0f",
      "keywords": [
        "秒表",
        "码表",
        "计时器"
      ]
    },
    {
      "unified": "23f2-fe0f",
      "keywords": [
        "定时器",
        "计时器"
      ]
    },
    {
      "unified": "1f570-fe0f",
      "keywords": [
        "座钟",
        "台钟",
        "壁炉钟"
      ]
    },
    {
      "unified": "1f55b",
      "keywords": [
        "十二点",
        "12:00"
      ]
    },
    {
      "unified": "1f567",
      "keywords": [
        "十二点半",
        "12:30"
      ]
    },
    {
      "unified": "1f550",
      "keywords": [
        "一点",
        "1:00"
      ]
    },
    {
      "unified": "1f55c",
      "keywords": [
        "一点半",
        "1:30"
      ]
    },
    {
      "unified": "1f551",
      "keywords": [
        "两点",
        "2:00"
      ]
    },
    {
      "unified": "1f55d",
      "keywords": [
        "两点半",
        "2:30"
      ]
    },
    {
      "unified": "1f552",
      "keywords": [
        "三点",
        "3:00"
      ]
    },
    {
      "unified": "1f55e",
      "keywords": [
        "三点半",
        "3:30"
      ]
    },
    {
      "unified": "1f553",
      "keywords": [
        "四点",
        "4:00"
      ]
    },
    {
      "unified": "1f55f",
      "keywords": [
        "四点半",
        "4:30"
      ]
    },
    {
      "unified": "1f554",
      "keywords": [
        "五点",
        "5:00"
      ]
    },
    {
      "unified": "1f560",
      "keywords": [
        "五点半",
        "5:30"
      ]
    },
    {
      "unified": "1f555",
      "keywords": [
        "六点",
        "6:00"
      ]
    },
    {
      "unified": "1f561",
      "keywords": [
        "六点半",
        "6:30"
      ]
    },
    {
      "unified": "1f556",
      "keywords": [
        "七点",
        "7:00"
      ]
    },
    {
      "unified": "1f562",
      "keywords": [
        "七点半",
        "7:30"
      ]
    },
    {
      "unified": "1f557",
      "keywords": [
        "八点",
        "8:00"
      ]
    },
    {
      "unified": "1f563",
      "keywords": [
        "八点半",
        "8:30"
      ]
    },
    {
      "unified": "1f558",
      "keywords": [
        "九点",
        "9:00"
      ]
    },
    {
      "unified": "1f564",
      "keywords": [
        "九点半",
        "9:30"
      ]
    },
    {
      "unified": "1f559",
      "keywords": [
        "十点",
        "10:00"
      ]
    },
    {
      "unified": "1f565",
      "keywords": [
        "十点半",
        "10:30"
      ]
    },
    {
      "unified": "1f55a",
      "keywords": [
        "十一点",
        "11:00"
      ]
    },
    {
      "unified": "1f566",
      "keywords": [
        "十一点半",
        "11:30"
      ]
    },
    {
      "unified": "1f311",
      "keywords": [
        "朔月",
        "新月",
        "月亮"
      ]
    },
    {
      "unified": "1f312",
      "keywords": [
        "弯月",
        "月亮",
        "眉月",
        "娥眉月",
        "三日月"
      ]
    },
    {
      "unified": "1f313",
      "keywords": [
        "月亮",
        "上弦月"
      ]
    },
    {
      "unified": "1f314",
      "keywords": [
        "月亮",
        "盈凸月"
      ]
    },
    {
      "unified": "1f315",
      "keywords": [
        "满月",
        "月亮",
        "望月"
      ]
    },
    {
      "unified": "1f316",
      "keywords": [
        "月亮",
        "亏凸月"
      ]
    },
    {
      "unified": "1f317",
      "keywords": [
        "月亮",
        "下弦月"
      ]
    },
    {
      "unified": "1f318",
      "keywords": [
        "残月",
        "弯月",
        "月亮",
        "亏眉月"
      ]
    },
    {
      "unified": "1f319",
      "keywords": [
        "弯月",
        "月亮",
        "娥眉月"
      ]
    },
    {
      "unified": "1f31a",
      "keywords": [
        "月亮",
        "朔月",
        "微笑的朔月"
      ]
    },
    {
      "unified": "1f31b",
      "keywords": [
        "月亮",
        "蛾眉月",
        "微笑的上弦月"
      ]
    },
    {
      "unified": "1f31c",
      "keywords": [
        "月亮",
        "残月",
        "微笑的下弦月"
      ]
    },
    {
      "unified": "1f321-fe0f",
      "keywords": [
        "天气",
        "气温",
        "温度计"
      ]
    },
    {
      "unified": "2600-fe0f",
      "keywords": [
        "晴",
        "太阳",
        "晴天"
      ]
    },
    {
      "unified": "1f31d",
      "keywords": [
        "月亮",
        "望月",
        "满月",
        "微笑的月亮"
      ]
    },
    {
      "unified": "1f31e",
      "keywords": [
        "太阳",
        "微笑的太阳"
      ]
    },
    {
      "unified": "1fa90",
      "keywords": [
        "土星",
        "有环行星"
      ]
    },
    {
      "unified": "2b50",
      "keywords": [
        "星星",
        "五角星"
      ]
    },
    {
      "unified": "1f31f",
      "keywords": [
        "发光",
        "星星",
        "闪亮的星星"
      ]
    },
    {
      "unified": "1f320",
      "keywords": [
        "流星"
      ]
    },
    {
      "unified": "1f30c",
      "keywords": [
        "银河",
        "星空"
      ]
    },
    {
      "unified": "2601-fe0f",
      "keywords": [
        "云",
        "阴"
      ]
    },
    {
      "unified": "26c5",
      "keywords": [
        "阴",
        "多云",
        "乌云蔽日"
      ]
    },
    {
      "unified": "26c8-fe0f",
      "keywords": [
        "雨",
        "阵雨",
        "雷阵雨"
      ]
    },
    {
      "unified": "1f324-fe0f",
      "keywords": [
        "云",
        "太阳",
        "少云",
        "晴偶有云"
      ]
    },
    {
      "unified": "1f325-fe0f",
      "keywords": [
        "云",
        "多云",
        "太阳"
      ]
    },
    {
      "unified": "1f326-fe0f",
      "keywords": [
        "云",
        "雨",
        "太阳",
        "晴转雨"
      ]
    },
    {
      "unified": "1f327-fe0f",
      "keywords": [
        "云",
        "雨",
        "下雨"
      ]
    },
    {
      "unified": "1f328-fe0f",
      "keywords": [
        "云",
        "雪",
        "下雪"
      ]
    },
    {
      "unified": "1f329-fe0f",
      "keywords": [
        "云",
        "雷",
        "打雷",
        "闪电"
      ]
    },
    {
      "unified": "1f32a-fe0f",
      "keywords": [
        "云",
        "旋风",
        "龙卷风"
      ]
    },
    {
      "unified": "1f32b-fe0f",
      "keywords": [
        "雾",
        "霾"
      ]
    },
    {
      "unified": "1f32c-fe0f",
      "keywords": [
        "大风",
        "狂风"
      ]
    },
    {
      "unified": "1f300",
      "keywords": [
        "台风",
        "旋风",
        "飓风"
      ]
    },
    {
      "unified": "1f308",
      "keywords": [
        "彩虹"
      ]
    },
    {
      "unified": "1f302",
      "keywords": [
        "伞",
        "雨",
        "雨伞",
        "收起的伞"
      ]
    },
    {
      "unified": "2602-fe0f",
      "keywords": [
        "伞",
        "雨",
        "雨伞"
      ]
    },
    {
      "unified": "2614",
      "keywords": [
        "雨伞",
        "下雨",
        "雨滴"
      ]
    },
    {
      "unified": "26f1-fe0f",
      "keywords": [
        "伞",
        "阳伞"
      ]
    },
    {
      "unified": "26a1",
      "keywords": [
        "高压",
        "危险",
        "有电",
        "闪电"
      ]
    },
    {
      "unified": "2744-fe0f",
      "keywords": [
        "冷",
        "雪",
        "雪花"
      ]
    },
    {
      "unified": "2603-fe0f",
      "keywords": [
        "雪",
        "雪人",
        "雪与雪人"
      ]
    },
    {
      "unified": "26c4",
      "keywords": [
        "雪人"
      ]
    },
    {
      "unified": "2604-fe0f",
      "keywords": [
        "彗星",
        "太空"
      ]
    },
    {
      "unified": "1f525",
      "keywords": [
        "火",
        "火焰"
      ]
    },
    {
      "unified": "1f4a7",
      "keywords": [
        "冷",
        "水",
        "水滴"
      ]
    },
    {
      "unified": "1f30a",
      "keywords": [
        "浪花",
        "波浪",
        "海洋"
      ]
    }
  ],
  "objects": [
    {
      "unified": "1f453",
      "keywords": [
        "眼镜",
        "服饰",
        "眼睛"
      ]
    },
    {
      "unified": "1f576-fe0f",
      "keywords": [
        "墨镜",
        "太阳镜"
      ]
    },
    {
      "unified": "1f97d",
      "keywords": [
        "护眼",
        "游泳",
        "焊接",
        "护目镜"
      ]
    },
    {
      "unified": "1f97c",
      "keywords": [
        "医生",
        "白大褂",
        "科学家",
        "实验人员"
      ]
    },
    {
      "unified": "1f9ba",
      "keywords": [
        "安全",
        "紧急",
        "背心",
        "逃生",
        "救生衣"
      ]
    },
    {
      "unified": "1f454",
      "keywords": [
        "领带",
        "衬衫领带"
      ]
    },
    {
      "unified": "1f455",
      "keywords": [
        "T恤",
        "t恤",
        "恤衫"
      ]
    },
    {
      "unified": "1f456",
      "keywords": [
        "裤子",
        "牛仔裤"
      ]
    },
    {
      "unified": "1f9e3",
      "keywords": [
        "围巾"
      ]
    },
    {
      "unified": "1f9e4",
      "keywords": [
        "手套"
      ]
    },
    {
      "unified": "1f9e5",
      "keywords": [
        "外套",
        "夹克"
      ]
    },
    {
      "unified": "1f9e6",
      "keywords": [
        "袜子",
        "短袜",
        "长袜"
      ]
    },
    {
      "unified": "1f457",
      "keywords": [
        "衣服",
        "连衣裙"
      ]
    },
    {
      "unified": "1f458",
      "keywords": [
        "和服",
        "日本"
      ]
    },
    {
      "unified": "1f97b",
      "keywords": [
        "纱丽",
        "披肩",
        "衣服"
      ]
    },
    {
      "unified": "1fa71",
      "keywords": [
        "泳衣",
        "泳装",
        "游泳",
        "一片式",
        "连体泳衣"
      ]
    },
    {
      "unified": "1fa72",
      "keywords": [
        "内裤",
        "泳衣",
        "泳装",
        "短裤",
        "三角裤",
        "一片式"
      ]
    },
    {
      "unified": "1fa73",
      "keywords": [
        "短裤",
        "内裤",
        "泳衣",
        "泳装",
        "裤子",
        "四角裤"
      ]
    },
    {
      "unified": "1f459",
      "keywords": [
        "泳装",
        "比基尼",
        "三点式"
      ]
    },
    {
      "unified": "1f45a",
      "keywords": [
        "女",
        "女装",
        "衣服"
      ]
    },
    {
      "unified": "1faad",
      "keywords": [
        "凉",
        "扇",
        "热",
        "折扇",
        "扇动",
        "羞涩",
        "腼腆",
        "舞蹈"
      ]
    },
    {
      "unified": "1f45b",
      "keywords": [
        "钱包"
      ]
    },
    {
      "unified": "1f45c",
      "keywords": [
        "挎包",
        "手提包"
      ]
    },
    {
      "unified": "1f45d",
      "keywords": [
        "包",
        "手袋",
        "手拿包"
      ]
    },
    {
      "unified": "1f6cd-fe0f",
      "keywords": [
        "包",
        "袋",
        "逛街",
        "购物袋"
      ]
    },
    {
      "unified": "1f392",
      "keywords": [
        "包",
        "书包"
      ]
    },
    {
      "unified": "1fa74",
      "keywords": [
        "凉鞋",
        "草屡",
        "夹趾凉鞋",
        "沙滩凉鞋"
      ]
    },
    {
      "unified": "1f45e",
      "keywords": [
        "鞋",
        "男鞋"
      ]
    },
    {
      "unified": "1f45f",
      "keywords": [
        "鞋",
        "跑鞋",
        "运动鞋"
      ]
    },
    {
      "unified": "1f97e",
      "keywords": [
        "徒步",
        "登山",
        "露营",
        "登山鞋",
        "远足野营"
      ]
    },
    {
      "unified": "1f97f",
      "keywords": [
        "便鞋",
        "平底鞋",
        "一脚蹬",
        "平底芭蕾舞鞋"
      ]
    },
    {
      "unified": "1f460",
      "keywords": [
        "女",
        "鞋",
        "高跟鞋"
      ]
    },
    {
      "unified": "1f461",
      "keywords": [
        "女",
        "凉鞋",
        "女式凉鞋"
      ]
    },
    {
      "unified": "1fa70",
      "keywords": [
        "舞蹈",
        "舞鞋",
        "跳舞",
        "足尖鞋",
        "芭蕾舞鞋"
      ]
    },
    {
      "unified": "1f462",
      "keywords": [
        "女",
        "女靴",
        "靴子"
      ]
    },
    {
      "unified": "1faae",
      "keywords": [
        "发夹",
        "圆蓬",
        "头发",
        "夹子",
        "梳子",
        "爆炸头",
        "非洲头"
      ]
    },
    {
      "unified": "1f451",
      "keywords": [
        "皇冠",
        "王冠"
      ]
    },
    {
      "unified": "1f452",
      "keywords": [
        "女",
        "女帽",
        "帽子"
      ]
    },
    {
      "unified": "1f3a9",
      "keywords": [
        "礼帽",
        "帽子",
        "高帽"
      ]
    },
    {
      "unified": "1f393",
      "keywords": [
        "毕业帽",
        "四方帽"
      ]
    },
    {
      "unified": "1f9e2",
      "keywords": [
        "鸭舌帽",
        "棒球帽"
      ]
    },
    {
      "unified": "1fa96",
      "keywords": [
        "军用",
        "军队",
        "士兵",
        "头盔",
        "战士",
        "军用头盔"
      ]
    },
    {
      "unified": "26d1-fe0f",
      "keywords": [
        "十字",
        "头盔",
        "安全帽",
        "白十字头盔"
      ]
    },
    {
      "unified": "1f4ff",
      "keywords": [
        "念珠",
        "宗教",
        "珠子",
        "祈祷",
        "项链"
      ]
    },
    {
      "unified": "1f484",
      "keywords": [
        "唇膏",
        "口红",
        "化妆品"
      ]
    },
    {
      "unified": "1f48d",
      "keywords": [
        "戒指",
        "钻戒"
      ]
    },
    {
      "unified": "1f48e",
      "keywords": [
        "宝石",
        "钻石"
      ]
    },
    {
      "unified": "1f507",
      "keywords": [
        "安静",
        "无声",
        "静音",
        "扬声器",
        "扬声器关闭",
        "已静音的扬声器"
      ]
    },
    {
      "unified": "1f508",
      "keywords": [
        "小声",
        "轻声",
        "小音量",
        "扬声器",
        "低音量的扬声器"
      ]
    },
    {
      "unified": "1f509",
      "keywords": [
        "中等",
        "扬声器",
        "中等音量",
        "中等音量的扬声器"
      ]
    },
    {
      "unified": "1f50a",
      "keywords": [
        "大声",
        "大音量",
        "扬声器",
        "高音量的扬声器"
      ]
    },
    {
      "unified": "1f4e2",
      "keywords": [
        "喇叭",
        "大声",
        "广播",
        "通知",
        "公共广播"
      ]
    },
    {
      "unified": "1f4e3",
      "keywords": [
        "呼喊",
        "大声",
        "通知",
        "扩音器",
        "喇叭筒"
      ]
    },
    {
      "unified": "1f4ef",
      "keywords": [
        "号",
        "邮号",
        "号角",
        "喇叭",
        "邮政"
      ]
    },
    {
      "unified": "1f514",
      "keywords": [
        "铃铛",
        "叮当",
        "响铃"
      ]
    },
    {
      "unified": "1f515",
      "keywords": [
        "安静",
        "无声",
        "静音",
        "禁止响铃",
        "响铃关闭"
      ]
    },
    {
      "unified": "1f3bc",
      "keywords": [
        "乐谱",
        "音乐",
        "音符",
        "五线谱"
      ]
    },
    {
      "unified": "1f3b5",
      "keywords": [
        "音符",
        "乐谱",
        "音乐",
        "五线谱",
        "八分音符"
      ]
    },
    {
      "unified": "1f3b6",
      "keywords": [
        "乐谱",
        "音乐",
        "音符",
        "五线谱",
        "多个音符",
        "八分音符"
      ]
    },
    {
      "unified": "1f399-fe0f",
      "keywords": [
        "麦",
        "音乐",
        "麦克",
        "录音室",
        "麦克风",
        "录音室麦克风"
      ]
    },
    {
      "unified": "1f39a-fe0f",
      "keywords": [
        "滑块",
        "电平",
        "调节",
        "音乐",
        "电平滑块"
      ]
    },
    {
      "unified": "1f39b-fe0f",
      "keywords": [
        "控制",
        "旋钮",
        "调节",
        "音乐",
        "控制旋钮"
      ]
    },
    {
      "unified": "1f3a4",
      "keywords": [
        "麦",
        "唱k",
        "唱歌",
        "麦克",
        "麦克风",
        "卡拉ok"
      ]
    },
    {
      "unified": "1f3a7",
      "keywords": [
        "耳机",
        "头戴式耳机"
      ]
    },
    {
      "unified": "1f4fb",
      "keywords": [
        "广播",
        "电台",
        "收音机",
        "无线电",
        "广播电台"
      ]
    },
    {
      "unified": "1f3b7",
      "keywords": [
        "乐器",
        "吹奏",
        "演奏",
        "音乐",
        "萨克斯管"
      ]
    },
    {
      "unified": "1fa97",
      "keywords": [
        "风琴",
        "手风琴",
        "六角形风琴"
      ]
    },
    {
      "unified": "1f3b8",
      "keywords": [
        "吉他",
        "乐器",
        "弹奏",
        "演奏",
        "音乐"
      ]
    },
    {
      "unified": "1f3b9",
      "keywords": [
        "乐器",
        "弹奏",
        "演奏",
        "钢琴",
        "音乐",
        "音乐键盘"
      ]
    },
    {
      "unified": "1f3ba",
      "keywords": [
        "小号",
        "乐器",
        "吹奏",
        "喇叭",
        "音乐"
      ]
    },
    {
      "unified": "1f3bb",
      "keywords": [
        "乐器",
        "提琴",
        "演奏",
        "音乐",
        "小提琴"
      ]
    },
    {
      "unified": "1fa95",
      "keywords": [
        "弹奏",
        "音乐",
        "班卓琴",
        "弦乐器"
      ]
    },
    {
      "unified": "1f941",
      "keywords": [
        "鼓",
        "音乐",
        "鼓声",
        "鼓槌"
      ]
    },
    {
      "unified": "1fa98",
      "keywords": [
        "敲",
        "鼓",
        "长鼓",
        "节奏",
        "康加鼓"
      ]
    },
    {
      "unified": "1fa87",
      "keywords": [
        "摇",
        "沙球",
        "乐器",
        "音乐",
        "拨浪鼓",
        "打击乐器"
      ]
    },
    {
      "unified": "1fa88",
      "keywords": [
        "长笛",
        "竖笛",
        "音乐",
        "管乐器",
        "菲菲笛",
        "木管乐器"
      ]
    },
    {
      "unified": "1f4f1",
      "keywords": [
        "手机",
        "电话",
        "移动",
        "手提电话",
        "智能手机"
      ]
    },
    {
      "unified": "1f4f2",
      "keywords": [
        "手机",
        "接收",
        "来电",
        "智能手机",
        "带有箭头的手机"
      ]
    },
    {
      "unified": "260e-fe0f",
      "keywords": [
        "电话",
        "固话",
        "座机",
        "固定电话"
      ]
    },
    {
      "unified": "1f4de",
      "keywords": [
        "固话",
        "座机",
        "电话",
        "电话听筒",
        "固定电话"
      ]
    },
    {
      "unified": "1f4df",
      "keywords": [
        "呼机",
        "寻呼机",
        "传呼机",
        "bb 机"
      ]
    },
    {
      "unified": "1f4e0",
      "keywords": [
        "传真",
        "传真机",
        "传真号",
        "发传真"
      ]
    },
    {
      "unified": "1f50b",
      "keywords": [
        "电池",
        "正极",
        "电极",
        "电源",
        "负极",
        "蓄电池"
      ]
    },
    {
      "unified": "1faab",
      "keywords": [
        "电子",
        "低能量",
        "电池电量不足"
      ]
    },
    {
      "unified": "1f50c",
      "keywords": [
        "插头",
        "电源",
        "电线",
        "电插头",
        "电源插头"
      ]
    },
    {
      "unified": "1f4bb",
      "keywords": [
        "pc",
        "电脑",
        "个人电脑",
        "手提电脑",
        "笔记本电脑"
      ]
    },
    {
      "unified": "1f5a5-fe0f",
      "keywords": [
        "pc",
        "显示器",
        "显示屏",
        "计算机",
        "台式电脑",
        "个人电脑"
      ]
    },
    {
      "unified": "1f5a8-fe0f",
      "keywords": [
        "复印",
        "扫描",
        "打印机",
        "印刷机",
        "喷墨打印",
        "激光打印"
      ]
    },
    {
      "unified": "2328-fe0f",
      "keywords": [
        "键盘",
        "打字",
        "按键",
        "电脑",
        "输入"
      ]
    },
    {
      "unified": "1f5b1-fe0f",
      "keywords": [
        "点击",
        "点按",
        "电脑",
        "电脑鼠标",
        "有线鼠标",
        "激光鼠标"
      ]
    },
    {
      "unified": "1f5b2-fe0f",
      "keywords": [
        "电脑",
        "鼠标",
        "轨迹球",
        "追踪球",
        "有线鼠标"
      ]
    },
    {
      "unified": "1f4bd",
      "keywords": [
        "光盘",
        "电脑光盘",
        "迷你光碟",
        "迷你唱片",
        "mini光盘",
        "minidisk"
      ]
    },
    {
      "unified": "1f4be",
      "keywords": [
        "软盘",
        "便携",
        "存储",
        "磁盘",
        "3.5英寸"
      ]
    },
    {
      "unified": "1f4bf",
      "keywords": [
        "光盘",
        "cd",
        "专辑",
        "存储",
        "影片",
        "音乐"
      ]
    },
    {
      "unified": "1f4c0",
      "keywords": [
        "光盘",
        "光碟",
        "影片",
        "音乐",
        "DVD",
        "dvd"
      ]
    },
    {
      "unified": "1f9ee",
      "keywords": [
        "算盘",
        "计算"
      ]
    },
    {
      "unified": "1f3a5",
      "keywords": [
        "摄影",
        "电影",
        "摄像机",
        "摄录机",
        "摄影机",
        "电影摄影机"
      ]
    },
    {
      "unified": "1f39e-fe0f",
      "keywords": [
        "帧",
        "电影",
        "胶卷",
        "胶片",
        "影片帧",
        "电影胶片"
      ]
    },
    {
      "unified": "1f4fd-fe0f",
      "keywords": [
        "影片",
        "电影",
        "视频",
        "投影仪",
        "放映机",
        "电影放映机"
      ]
    },
    {
      "unified": "1f3ac",
      "keywords": [
        "场记",
        "打板",
        "场记板",
        "拍电影"
      ]
    },
    {
      "unified": "1f4fa",
      "keywords": [
        "电视",
        "节目",
        "视频",
        "电视机",
        "看电视"
      ]
    },
    {
      "unified": "1f4f7",
      "keywords": [
        "相机",
        "拍照",
        "摄影",
        "照片",
        "照相机",
        "卡片相机"
      ]
    },
    {
      "unified": "1f4f8",
      "keywords": [
        "拍照",
        "相机",
        "闪光灯",
        "闪光灯打开",
        "开闪光灯的相机"
      ]
    },
    {
      "unified": "1f4f9",
      "keywords": [
        "录像",
        "录影",
        "拍摄",
        "视频",
        "摄像机",
        "摄影机"
      ]
    },
    {
      "unified": "1f4fc",
      "keywords": [
        "磁带",
        "录像带",
        "vhs",
        "录影带"
      ]
    },
    {
      "unified": "1f50d",
      "keywords": [
        "工具",
        "搜索",
        "放大",
        "查找",
        "放大镜",
        "左斜的放大镜"
      ]
    },
    {
      "unified": "1f50e",
      "keywords": [
        "工具",
        "搜索",
        "放大",
        "查找",
        "放大镜",
        "右斜的放大镜"
      ]
    },
    {
      "unified": "1f56f-fe0f",
      "keywords": [
        "光",
        "蜡烛",
        "烛光",
        "烛火",
        "照明",
        "燃烧"
      ]
    },
    {
      "unified": "1f4a1",
      "keywords": [
        "灯泡",
        "主意",
        "想法",
        "电灯泡",
        "白炽灯"
      ]
    },
    {
      "unified": "1f526",
      "keywords": [
        "光",
        "工具",
        "手电",
        "照明",
        "电筒",
        "手电筒"
      ]
    },
    {
      "unified": "1f3ee",
      "keywords": [
        "光",
        "喜庆",
        "灯笼",
        "节日",
        "红灯笼"
      ]
    },
    {
      "unified": "1fa94",
      "keywords": [
        "油",
        "灯",
        "迪亚",
        "排灯节",
        "印度油灯"
      ]
    },
    {
      "unified": "1f4d4",
      "keywords": [
        "封面",
        "本子",
        "笔记",
        "记录",
        "笔记本",
        "精装笔记本"
      ]
    },
    {
      "unified": "1f4d5",
      "keywords": [
        "书",
        "书本",
        "合上",
        "合上的书本"
      ]
    },
    {
      "unified": "1f4d6",
      "keywords": [
        "书",
        "书本",
        "打开",
        "读书",
        "阅读",
        "打开的书本"
      ]
    },
    {
      "unified": "1f4d7",
      "keywords": [
        "书",
        "绿",
        "书本",
        "绿色",
        "绿色书本"
      ]
    },
    {
      "unified": "1f4d8",
      "keywords": [
        "书",
        "篮",
        "书本",
        "蓝色",
        "蓝色书本"
      ]
    },
    {
      "unified": "1f4d9",
      "keywords": [
        "书",
        "书本",
        "橙色",
        "橙色书本"
      ]
    },
    {
      "unified": "1f4da",
      "keywords": [
        "书",
        "书本",
        "书籍",
        "图书",
        "学习"
      ]
    },
    {
      "unified": "1f4d3",
      "keywords": [
        "本子",
        "笔记",
        "记录",
        "笔记本",
        "日记本",
        "记事本"
      ]
    },
    {
      "unified": "1f4d2",
      "keywords": [
        "账本",
        "记账",
        "账簿",
        "笔记本",
        "记事本"
      ]
    },
    {
      "unified": "1f4c3",
      "keywords": [
        "卷边",
        "文书",
        "文件",
        "文档",
        "带卷边的页面"
      ]
    },
    {
      "unified": "1f4dc",
      "keywords": [
        "纸",
        "卷轴",
        "画卷",
        "纸卷",
        "羊皮纸"
      ]
    },
    {
      "unified": "1f4c4",
      "keywords": [
        "文件",
        "文书",
        "文档"
      ]
    },
    {
      "unified": "1f4f0",
      "keywords": [
        "报纸",
        "报道",
        "新闻",
        "看报",
        "读报"
      ]
    },
    {
      "unified": "1f5de-fe0f",
      "keywords": [
        "纸",
        "卷起",
        "报纸",
        "新闻",
        "报纸卷",
        "卷起的报纸"
      ]
    },
    {
      "unified": "1f4d1",
      "keywords": [
        "书签",
        "标签页",
        "有书签的页面"
      ]
    },
    {
      "unified": "1f516",
      "keywords": [
        "书签",
        "标签",
        "读书",
        "阅读"
      ]
    },
    {
      "unified": "1f3f7-fe0f",
      "keywords": [
        "标签",
        "吊牌",
        "标记",
        "行李牌"
      ]
    },
    {
      "unified": "1f4b0",
      "keywords": [
        "钱",
        "钱袋",
        "美元",
        "钱包"
      ]
    },
    {
      "unified": "1fa99",
      "keywords": [
        "金",
        "钱",
        "银",
        "硬币",
        "财富",
        "金属"
      ]
    },
    {
      "unified": "1f4b4",
      "keywords": [
        "钱",
        "日元",
        "现金",
        "货币",
        "钞票"
      ]
    },
    {
      "unified": "1f4b5",
      "keywords": [
        "钱",
        "美元",
        "现金",
        "纸币",
        "货币"
      ]
    },
    {
      "unified": "1f4b6",
      "keywords": [
        "钱",
        "欧元",
        "现金",
        "货币",
        "钞票"
      ]
    },
    {
      "unified": "1f4b7",
      "keywords": [
        "钱",
        "英镑",
        "现金",
        "货币",
        "钞票"
      ]
    },
    {
      "unified": "1f4b8",
      "keywords": [
        "钱",
        "纸币",
        "翅膀",
        "花钱",
        "长翅膀的钱"
      ]
    },
    {
      "unified": "1f4b3",
      "keywords": [
        "卡",
        "刷卡",
        "信用卡",
        "借记卡",
        "贷记卡",
        "银行卡"
      ]
    },
    {
      "unified": "1f9fe",
      "keywords": [
        "收据",
        "凭据",
        "发票",
        "记账",
        "证明",
        "账单"
      ]
    },
    {
      "unified": "1f4b9",
      "keywords": [
        "上扬",
        "上涨",
        "走势",
        "日元汇率",
        "货币升值图表",
        "趋势向上且带有日元符号的图表"
      ]
    },
    {
      "unified": "2709-fe0f",
      "keywords": [
        "信封",
        "信件",
        "信息",
        "来信",
        "邮件"
      ]
    },
    {
      "unified": "1f4e7",
      "keywords": [
        "信封",
        "邮件",
        "电子邮件"
      ]
    },
    {
      "unified": "1f4e8",
      "keywords": [
        "来信",
        "接收",
        "收信",
        "收到来信",
        "收到邮件",
        "电子邮件"
      ]
    },
    {
      "unified": "1f4e9",
      "keywords": [
        "信件",
        "信封",
        "发信",
        "发出",
        "发送",
        "邮件",
        "收邮件",
        "发邮件"
      ]
    },
    {
      "unified": "1f4e4",
      "keywords": [
        "信件",
        "发信",
        "发送",
        "邮件",
        "发件箱",
        "发邮件"
      ]
    },
    {
      "unified": "1f4e5",
      "keywords": [
        "信件",
        "接收",
        "收信",
        "邮件",
        "收件箱",
        "收到邮件"
      ]
    },
    {
      "unified": "1f4e6",
      "keywords": [
        "包裹",
        "快递",
        "盒子",
        "箱子",
        "装货",
        "运送"
      ]
    },
    {
      "unified": "1f4eb",
      "keywords": [
        "信箱",
        "旗标",
        "有新信件",
        "有待收信件"
      ]
    },
    {
      "unified": "1f4ea",
      "keywords": [
        "信箱",
        "旗标",
        "无新信件",
        "无待收信件"
      ]
    },
    {
      "unified": "1f4ec",
      "keywords": [
        "信箱",
        "打开",
        "旗标",
        "有新信件",
        "有待收信件"
      ]
    },
    {
      "unified": "1f4ed",
      "keywords": [
        "信箱",
        "旗标",
        "无新信件",
        "无待收信件"
      ]
    },
    {
      "unified": "1f4ee",
      "keywords": [
        "信",
        "邮筒",
        "寄信",
        "邮箱"
      ]
    },
    {
      "unified": "1f5f3-fe0f",
      "keywords": [
        "投票",
        "选举",
        "选票",
        "投票箱"
      ]
    },
    {
      "unified": "270f-fe0f",
      "keywords": [
        "笔",
        "铅笔",
        "橡皮",
        "画画",
        "画笔",
        "绘画",
        "橡皮擦"
      ]
    },
    {
      "unified": "2712-fe0f",
      "keywords": [
        "写字",
        "硬笔",
        "笔尖",
        "钢笔",
        "钢笔尖"
      ]
    },
    {
      "unified": "1f58b-fe0f",
      "keywords": [
        "笔",
        "钢笔",
        "写字",
        "硬笔"
      ]
    },
    {
      "unified": "1f58a-fe0f",
      "keywords": [
        "笔",
        "油笔",
        "原子笔",
        "圆珠笔"
      ]
    },
    {
      "unified": "1f58c-fe0f",
      "keywords": [
        "刷",
        "画笔",
        "毛笔",
        "画刷",
        "笔刷"
      ]
    },
    {
      "unified": "1f58d-fe0f",
      "keywords": [
        "蜡笔",
        "画棒",
        "油画棒"
      ]
    },
    {
      "unified": "1f4dd",
      "keywords": [
        "便条",
        "便笺",
        "备忘录",
        "便条簿"
      ]
    },
    {
      "unified": "1f4bc",
      "keywords": [
        "包",
        "公文包",
        "公事包",
        "手提包"
      ]
    },
    {
      "unified": "1f4c1",
      "keywords": [
        "办公",
        "文件",
        "文具",
        "文件夹",
        "硬纸夹"
      ]
    },
    {
      "unified": "1f4c2",
      "keywords": [
        "办公",
        "打开",
        "文件",
        "文具",
        "打开的文件夹"
      ]
    },
    {
      "unified": "1f5c2-fe0f",
      "keywords": [
        "分隔",
        "索引",
        "文件夹",
        "索引分隔文件夹"
      ]
    },
    {
      "unified": "1f4c5",
      "keywords": [
        "日历",
        "日期"
      ]
    },
    {
      "unified": "1f4c6",
      "keywords": [
        "日历",
        "日期",
        "手撕日历"
      ]
    },
    {
      "unified": "1f5d2-fe0f",
      "keywords": [
        "文具",
        "线圈本",
        "笔记本",
        "记事本"
      ]
    },
    {
      "unified": "1f5d3-fe0f",
      "keywords": [
        "日历",
        "日期",
        "线圈",
        "线圈日历"
      ]
    },
    {
      "unified": "1f4c7",
      "keywords": [
        "卡片",
        "目录",
        "索引",
        "卡片索引",
        "卡牌索引"
      ]
    },
    {
      "unified": "1f4c8",
      "keywords": [
        "上升",
        "上涨",
        "向上",
        "图表",
        "上涨图表",
        "趋势向上的图表"
      ]
    },
    {
      "unified": "1f4c9",
      "keywords": [
        "下跌",
        "下降",
        "向下",
        "图表",
        "下跌图表",
        "趋势向下的图表"
      ]
    },
    {
      "unified": "1f4ca",
      "keywords": [
        "图表",
        "条形图",
        "柱形图",
        "直方图"
      ]
    },
    {
      "unified": "1f4cb",
      "keywords": [
        "夹子",
        "纸张",
        "剪贴板",
        "写字板",
        "剪贴簿"
      ]
    },
    {
      "unified": "1f4cc",
      "keywords": [
        "图钉",
        "固定",
        "按钉"
      ]
    },
    {
      "unified": "1f4cd",
      "keywords": [
        "固定",
        "图钉",
        "圆图钉"
      ]
    },
    {
      "unified": "1f4ce",
      "keywords": [
        "纸夹",
        "回形针",
        "万字夹",
        "回纹针",
        "曲别针"
      ]
    },
    {
      "unified": "1f587-fe0f",
      "keywords": [
        "纸夹",
        "万字夹",
        "回形针",
        "回纹针",
        "曲别针",
        "连起来的两个回形针"
      ]
    },
    {
      "unified": "1f4cf",
      "keywords": [
        "尺",
        "直尺",
        "尺子",
        "文具",
        "测量",
        "长度"
      ]
    },
    {
      "unified": "1f4d0",
      "keywords": [
        "尺",
        "三角",
        "文具",
        "测量",
        "角度",
        "三角尺"
      ]
    },
    {
      "unified": "2702-fe0f",
      "keywords": [
        "剪",
        "剪刀",
        "修剪",
        "剪子",
        "剪裁",
        "工具"
      ]
    },
    {
      "unified": "1f5c3-fe0f",
      "keywords": [
        "箱",
        "存档",
        "标签",
        "档案",
        "索引",
        "卡片盒"
      ]
    },
    {
      "unified": "1f5c4-fe0f",
      "keywords": [
        "柜",
        "存档",
        "归档",
        "收纳",
        "档案",
        "文件柜"
      ]
    },
    {
      "unified": "1f5d1-fe0f",
      "keywords": [
        "垃圾",
        "垃圾桶",
        "垃圾篓",
        "废纸篓"
      ]
    },
    {
      "unified": "1f512",
      "keywords": [
        "锁",
        "上锁",
        "锁住",
        "锁定",
        "合上的锁"
      ]
    },
    {
      "unified": "1f513",
      "keywords": [
        "锁",
        "开锁",
        "解锁",
        "打开的锁",
        "取消锁定"
      ]
    },
    {
      "unified": "1f50f",
      "keywords": [
        "笔",
        "锁",
        "笔尖",
        "钢笔",
        "隐私",
        "墨水笔和锁"
      ]
    },
    {
      "unified": "1f510",
      "keywords": [
        "锁",
        "安全",
        "钥匙",
        "锁上",
        "钥匙和锁"
      ]
    },
    {
      "unified": "1f511",
      "keywords": [
        "钥匙",
        "密码",
        "密钥",
        "开锁",
        "解锁"
      ]
    },
    {
      "unified": "1f5dd-fe0f",
      "keywords": [
        "钥匙",
        "旧钥匙",
        "老式钥匙",
        "古老的钥匙"
      ]
    },
    {
      "unified": "1f528",
      "keywords": [
        "敲",
        "砸",
        "锤子",
        "工具",
        "施工",
        "铁锤"
      ]
    },
    {
      "unified": "1fa93",
      "keywords": [
        "切",
        "劈",
        "砍",
        "斧头",
        "木头"
      ]
    },
    {
      "unified": "26cf-fe0f",
      "keywords": [
        "铁镐",
        "工具",
        "挖掘",
        "采矿",
        "锄头",
        "鹤嘴锄"
      ]
    },
    {
      "unified": "2692-fe0f",
      "keywords": [
        "工具",
        "铁锤",
        "铁镐",
        "锤子",
        "镐子",
        "锤子与镐"
      ]
    },
    {
      "unified": "1f6e0-fe0f",
      "keywords": [
        "工具",
        "扳手",
        "铁锤",
        "锤子",
        "锤子与扳手"
      ]
    },
    {
      "unified": "1f5e1-fe0f",
      "keywords": [
        "匕首",
        "武器",
        "短刀"
      ]
    },
    {
      "unified": "2694-fe0f",
      "keywords": [
        "剑",
        "交叉",
        "双剑",
        "交叉放置的剑"
      ]
    },
    {
      "unified": "1f4a3",
      "keywords": [
        "炸弹",
        "爆炸"
      ]
    },
    {
      "unified": "1fa83",
      "keywords": [
        "反弹",
        "回弹",
        "回旋镖"
      ]
    },
    {
      "unified": "1f3f9",
      "keywords": [
        "弓",
        "箭",
        "射手",
        "射箭",
        "弓和箭"
      ]
    },
    {
      "unified": "1f6e1-fe0f",
      "keywords": [
        "盾",
        "盾牌",
        "武器",
        "防御"
      ]
    },
    {
      "unified": "1fa9a",
      "keywords": [
        "锯",
        "工具",
        "木匠",
        "木材",
        "木工锯"
      ]
    },
    {
      "unified": "1f527",
      "keywords": [
        "扳手",
        "工具",
        "螺丝扳手"
      ]
    },
    {
      "unified": "1fa9b",
      "keywords": [
        "工具",
        "螺丝",
        "螺丝刀"
      ]
    },
    {
      "unified": "1f529",
      "keywords": [
        "工具",
        "螺丝",
        "螺帽",
        "螺栓",
        "螺母",
        "螺母与螺栓"
      ]
    },
    {
      "unified": "2699-fe0f",
      "keywords": [
        "齿轮",
        "传动",
        "工具",
        "机械",
        "零件"
      ]
    },
    {
      "unified": "1f5dc-fe0f",
      "keywords": [
        "夹钳",
        "夹具",
        "工具",
        "机械",
        "紧固"
      ]
    },
    {
      "unified": "2696-fe0f",
      "keywords": [
        "天平",
        "公平",
        "公正",
        "正义",
        "法律"
      ]
    },
    {
      "unified": "1f9af",
      "keywords": [
        "盲",
        "盲杖",
        "拐杖",
        "无障碍"
      ]
    },
    {
      "unified": "1f517",
      "keywords": [
        "链接",
        "网址",
        "链条",
        "锁链"
      ]
    },
    {
      "unified": "26d3-fe0f-200d-1f4a5",
      "keywords": [
        "链",
        "断链",
        "手铐",
        "断开",
        "自由",
        "链条",
        "断开的链条"
      ]
    },
    {
      "unified": "26d3-fe0f",
      "keywords": [
        "链",
        "链条",
        "铁链",
        "锁链"
      ]
    },
    {
      "unified": "1fa9d",
      "keywords": [
        "抓",
        "挂钩",
        "卖点",
        "曲线",
        "钩状物"
      ]
    },
    {
      "unified": "1f9f0",
      "keywords": [
        "工具",
        "机修",
        "箱子",
        "工具箱"
      ]
    },
    {
      "unified": "1f9f2",
      "keywords": [
        "磁铁",
        "磁性",
        "吸引力",
        "马蹄铁"
      ]
    },
    {
      "unified": "1fa9c",
      "keywords": [
        "爬",
        "梯子",
        "台阶",
        "梯级",
        "横档"
      ]
    },
    {
      "unified": "2697-fe0f",
      "keywords": [
        "净化",
        "化学",
        "实验",
        "工具",
        "蒸馏器"
      ]
    },
    {
      "unified": "1f9ea",
      "keywords": [
        "试管",
        "化学",
        "实验",
        "科学",
        "化学家",
        "实验室"
      ]
    },
    {
      "unified": "1f9eb",
      "keywords": [
        "培养",
        "细菌",
        "培养皿",
        "实验室",
        "生物学",
        "生物学家"
      ]
    },
    {
      "unified": "1f9ec",
      "keywords": [
        "基因",
        "生命",
        "进化",
        "DNA",
        "dna",
        "遗传学",
        "生物学家"
      ]
    },
    {
      "unified": "1f52c",
      "keywords": [
        "实验",
        "工具",
        "生物",
        "科学",
        "细胞",
        "显微镜"
      ]
    },
    {
      "unified": "1f52d",
      "keywords": [
        "天体",
        "天文",
        "工具",
        "观星",
        "望远镜",
        "天文学"
      ]
    },
    {
      "unified": "1f4e1",
      "keywords": [
        "卫星",
        "天线",
        "卫星天线",
        "信号接收",
        "卫星接收天线",
        "卫星碟形天线"
      ]
    },
    {
      "unified": "1f489",
      "keywords": [
        "医学",
        "打针",
        "治疗",
        "针头",
        "针筒",
        "注射器"
      ]
    },
    {
      "unified": "1fa78",
      "keywords": [
        "血滴",
        "医疗",
        "月经",
        "献血",
        "经血",
        "输血"
      ]
    },
    {
      "unified": "1f48a",
      "keywords": [
        "药",
        "药丸",
        "吃药",
        "治疗",
        "药物"
      ]
    },
    {
      "unified": "1fa79",
      "keywords": [
        "伤口",
        "绷带",
        "胶布",
        "创可贴",
        "ok绷"
      ]
    },
    {
      "unified": "1fa7c",
      "keywords": [
        "拐杖",
        "受伤",
        "手杖",
        "残疾",
        "活动助行类辅具"
      ]
    },
    {
      "unified": "1fa7a",
      "keywords": [
        "医生",
        "医疗",
        "心脏",
        "心跳",
        "诊断",
        "听诊器"
      ]
    },
    {
      "unified": "1fa7b",
      "keywords": [
        "医生",
        "医疗",
        "骨架",
        "骨骼",
        "X射线",
        "x射线"
      ]
    },
    {
      "unified": "1f6aa",
      "keywords": [
        "门",
        "大门",
        "屋门",
        "房门",
        "房间",
        "出入口"
      ]
    },
    {
      "unified": "1f6d7",
      "keywords": [
        "电梯",
        "升降机",
        "可达性"
      ]
    },
    {
      "unified": "1fa9e",
      "keywords": [
        "镜子",
        "反射",
        "窥镜",
        "反射镜"
      ]
    },
    {
      "unified": "1fa9f",
      "keywords": [
        "窗户",
        "开窗",
        "景色",
        "窗框",
        "透明",
        "新鲜空气"
      ]
    },
    {
      "unified": "1f6cf-fe0f",
      "keywords": [
        "床",
        "宾馆",
        "床垫",
        "床铺",
        "睡眠",
        "睡觉"
      ]
    },
    {
      "unified": "1f6cb-fe0f",
      "keywords": [
        "家",
        "灯",
        "沙发",
        "阅读",
        "沙发和灯"
      ]
    },
    {
      "unified": "1fa91",
      "keywords": [
        "坐",
        "椅子",
        "座位",
        "椅背"
      ]
    },
    {
      "unified": "1f6bd",
      "keywords": [
        "马桶",
        "wc",
        "厕所",
        "卫生间",
        "洗手间"
      ]
    },
    {
      "unified": "1faa0",
      "keywords": [
        "活塞",
        "吸力",
        "马桶",
        "水管工"
      ]
    },
    {
      "unified": "1f6bf",
      "keywords": [
        "水",
        "淋浴",
        "喷头",
        "喷水",
        "洗澡 花洒"
      ]
    },
    {
      "unified": "1f6c1",
      "keywords": [
        "浴缸",
        "沐浴",
        "泡澡",
        "洗澡",
        "澡盆",
        "泡沫浴"
      ]
    },
    {
      "unified": "1faa4",
      "keywords": [
        "诱饵",
        "陷进",
        "捕鼠器"
      ]
    },
    {
      "unified": "1fa92",
      "keywords": [
        "刀",
        "刮",
        "毛",
        "胡子",
        "锋利",
        "剃须刀"
      ]
    },
    {
      "unified": "1f9f4",
      "keywords": [
        "乳液",
        "乳液瓶",
        "护肤霜",
        "洗发水",
        "防晒霜"
      ]
    },
    {
      "unified": "1f9f7",
      "keywords": [
        "别针",
        "扣针",
        "安全别针"
      ]
    },
    {
      "unified": "1f9f9",
      "keywords": [
        "扫帚",
        "女巫",
        "打扫",
        "扫地"
      ]
    },
    {
      "unified": "1f9fa",
      "keywords": [
        "筐",
        "农作",
        "野餐",
        "脏衣篮"
      ]
    },
    {
      "unified": "1f9fb",
      "keywords": [
        "卷纸",
        "纸巾",
        "卫生纸"
      ]
    },
    {
      "unified": "1faa3",
      "keywords": [
        "桶",
        "缸",
        "大桶",
        "木桶",
        "水桶"
      ]
    },
    {
      "unified": "1f9fc",
      "keywords": [
        "皂",
        "杀菌",
        "洗手",
        "清洁",
        "肥皂泡",
        "肥皂盒"
      ]
    },
    {
      "unified": "1fae7",
      "keywords": [
        "气泡",
        "打嗝",
        "水下",
        "清洁",
        "肥皂"
      ]
    },
    {
      "unified": "1faa5",
      "keywords": [
        "刷",
        "牙刷",
        "卫生",
        "情节",
        "浴室",
        "牙科",
        "牙齿"
      ]
    },
    {
      "unified": "1f9fd",
      "keywords": [
        "海绵",
        "吸水",
        "清洁",
        "渗透"
      ]
    },
    {
      "unified": "1f9ef",
      "keywords": [
        "火灾",
        "灭火",
        "灭火器"
      ]
    },
    {
      "unified": "1f6d2",
      "keywords": [
        "采购",
        "购物车",
        "手推车"
      ]
    },
    {
      "unified": "1f6ac",
      "keywords": [
        "烟",
        "香烟",
        "卷烟",
        "吸烟",
        "抽烟",
        "烟草"
      ]
    },
    {
      "unified": "26b0-fe0f",
      "keywords": [
        "棺材",
        "埋葬",
        "死亡",
        "灵柩",
        "葬礼",
        "陵墓"
      ]
    },
    {
      "unified": "1faa6",
      "keywords": [
        "墓碑",
        "公墓",
        "墓园",
        "墓地"
      ]
    },
    {
      "unified": "26b1-fe0f",
      "keywords": [
        "瓮",
        "缸",
        "葬礼",
        "骨灰缸"
      ]
    },
    {
      "unified": "1f9ff",
      "keywords": [
        "珠子",
        "护身符",
        "纳扎尔",
        "小装饰品",
        "恶魔之眼",
        "纳扎尔护身符"
      ]
    },
    {
      "unified": "1faac",
      "keywords": [
        "手",
        "保护",
        "玛丽",
        "护身符",
        "法蒂玛",
        "米里亚姆",
        "法蒂玛之手"
      ]
    },
    {
      "unified": "1f5ff",
      "keywords": [
        "摩埃",
        "摩艾",
        "毛埃",
        "复活岛",
        "复活节岛",
        "摩艾石像",
        "复活节岛石像"
      ]
    },
    {
      "unified": "1faa7",
      "keywords": [
        "布告",
        "标志",
        "海报",
        "示威",
        "标语牌",
        "警戒哨",
        "纠察队标语牌"
      ]
    },
    {
      "unified": "1faaa",
      "keywords": [
        "id",
        "凭证",
        "安全",
        "执照",
        "身份证"
      ]
    }
  ],
  "symbols": [
    {
      "unified": "1f3e7",
      "keywords": [
        "标识",
        "银行",
        "取款机",
        "柜员机"
      ]
    },
    {
      "unified": "1f6ae",
      "keywords": [
        "倒垃圾",
        "垃圾入篓",
        "垃圾丢弃处"
      ]
    },
    {
      "unified": "1f6b0",
      "keywords": [
        "水",
        "喝水",
        "接水",
        "饮用水",
        "水龙头"
      ]
    },
    {
      "unified": "267f",
      "keywords": [
        "残疾",
        "残障",
        "轮椅",
        "无障碍",
        "轮椅标识",
        "轮椅符号"
      ]
    },
    {
      "unified": "1f6b9",
      "keywords": [
        "男厕",
        "厕所",
        "男士",
        "卫生间",
        "洗手间"
      ]
    },
    {
      "unified": "1f6ba",
      "keywords": [
        "女厕",
        "厕所",
        "女士",
        "卫生间",
        "洗手间"
      ]
    },
    {
      "unified": "1f6bb",
      "keywords": [
        "厕所",
        "卫生间",
        "洗手间"
      ]
    },
    {
      "unified": "1f6bc",
      "keywords": [
        "宝宝",
        "婴儿",
        "母婴室"
      ]
    },
    {
      "unified": "1f6be",
      "keywords": [
        "厕所",
        "卫生间",
        "洗手间",
        "盥洗室"
      ]
    },
    {
      "unified": "1f6c2",
      "keywords": [
        "安检",
        "检查",
        "通行证",
        "护照检查"
      ]
    },
    {
      "unified": "1f6c3",
      "keywords": [
        "海关"
      ]
    },
    {
      "unified": "1f6c4",
      "keywords": [
        "提取",
        "行李",
        "提取行李"
      ]
    },
    {
      "unified": "1f6c5",
      "keywords": [
        "寄存",
        "行李",
        "寄存行李"
      ]
    },
    {
      "unified": "26a0-fe0f",
      "keywords": [
        "警告"
      ]
    },
    {
      "unified": "1f6b8",
      "keywords": [
        "交通",
        "安全",
        "行人",
        "指示牌",
        "儿童过街"
      ]
    },
    {
      "unified": "26d4",
      "keywords": [
        "交通",
        "禁止通行",
        "请勿入内",
        "请勿驶入"
      ]
    },
    {
      "unified": "1f6ab",
      "keywords": [
        "禁止",
        "不准",
        "不许",
        "严禁",
        "阻止"
      ]
    },
    {
      "unified": "1f6b3",
      "keywords": [
        "严禁",
        "交通",
        "非机动车",
        "禁止自行车"
      ]
    },
    {
      "unified": "1f6ad",
      "keywords": [
        "严禁",
        "抽烟",
        "禁止吸烟"
      ]
    },
    {
      "unified": "1f6af",
      "keywords": [
        "严禁",
        "垃圾",
        "禁止乱扔垃圾"
      ]
    },
    {
      "unified": "1f6b1",
      "keywords": [
        "水",
        "非饮用水",
        "非直饮水"
      ]
    },
    {
      "unified": "1f6b7",
      "keywords": [
        "严禁",
        "行人",
        "禁止行人通行"
      ]
    },
    {
      "unified": "1f4f5",
      "keywords": [
        "严禁",
        "电话",
        "禁止使用手机"
      ]
    },
    {
      "unified": "1f51e",
      "keywords": [
        "禁止",
        "18禁",
        "未成年人不宜"
      ]
    },
    {
      "unified": "2622-fe0f",
      "keywords": [
        "辐射",
        "标识",
        "放射性"
      ]
    },
    {
      "unified": "2623-fe0f",
      "keywords": [
        "动物",
        "生物危害",
        "当心感染"
      ]
    },
    {
      "unified": "2b06-fe0f",
      "keywords": [
        "北",
        "方向",
        "标识",
        "向上箭头"
      ]
    },
    {
      "unified": "2197-fe0f",
      "keywords": [
        "东北",
        "方向",
        "标识",
        "右上箭头"
      ]
    },
    {
      "unified": "27a1-fe0f",
      "keywords": [
        "东",
        "方向",
        "标识",
        "向右箭头"
      ]
    },
    {
      "unified": "2198-fe0f",
      "keywords": [
        "东南",
        "方向",
        "标识",
        "右下箭头"
      ]
    },
    {
      "unified": "2b07-fe0f",
      "keywords": [
        "向下",
        "基本",
        "方位",
        "正南",
        "箭头",
        "向下箭头"
      ]
    },
    {
      "unified": "2199-fe0f",
      "keywords": [
        "方向",
        "标识",
        "西南",
        "左下箭头"
      ]
    },
    {
      "unified": "2b05-fe0f",
      "keywords": [
        "西",
        "方向",
        "标识",
        "向左箭头"
      ]
    },
    {
      "unified": "2196-fe0f",
      "keywords": [
        "方向",
        "标识",
        "西北",
        "左上箭头"
      ]
    },
    {
      "unified": "2195-fe0f",
      "keywords": [
        "上下",
        "箭头",
        "上下箭头"
      ]
    },
    {
      "unified": "2194-fe0f",
      "keywords": [
        "左右",
        "箭头",
        "左右箭头"
      ]
    },
    {
      "unified": "21a9-fe0f",
      "keywords": [
        "箭头",
        "右转弯",
        "右转弯箭头",
        "向左弯曲的右箭头"
      ]
    },
    {
      "unified": "21aa-fe0f",
      "keywords": [
        "箭头",
        "左转弯",
        "左转弯箭头",
        "向右弯曲的左箭头"
      ]
    },
    {
      "unified": "2934-fe0f",
      "keywords": [
        "箭头",
        "右上弯",
        "右上弯箭头",
        "向上弯曲的右箭头"
      ]
    },
    {
      "unified": "2935-fe0f",
      "keywords": [
        "箭头",
        "右下弯",
        "右下弯箭头",
        "向下弯曲的右箭头"
      ]
    },
    {
      "unified": "1f503",
      "keywords": [
        "方向",
        "标识",
        "重新载入",
        "顺时针垂直箭头"
      ]
    },
    {
      "unified": "1f504",
      "keywords": [
        "箭头",
        "逆时针",
        "逆时针箭头",
        "逆时针箭头按钮"
      ]
    },
    {
      "unified": "1f519",
      "keywords": [
        "回退",
        "箭头",
        "返回",
        "返回箭头"
      ]
    },
    {
      "unified": "1f51a",
      "keywords": [
        "箭头",
        "结束",
        "结束箭头"
      ]
    },
    {
      "unified": "1f51b",
      "keywords": [
        "on",
        "开始",
        "标识",
        "箭头",
        "ON! 箭头",
        "on! 箭头"
      ]
    },
    {
      "unified": "1f51c",
      "keywords": [
        "箭头",
        "马上",
        "SOON 箭头",
        "soon 箭头"
      ]
    },
    {
      "unified": "1f51d",
      "keywords": [
        "置顶",
        "向上",
        "标识"
      ]
    },
    {
      "unified": "1f6d0",
      "keywords": [
        "地点",
        "礼拜",
        "祈祷",
        "宗教场所"
      ]
    },
    {
      "unified": "269b-fe0f",
      "keywords": [
        "物质",
        "无神论",
        "原子符号"
      ]
    },
    {
      "unified": "1f549-fe0f",
      "keywords": [
        "奥姆",
        "宗教"
      ]
    },
    {
      "unified": "2721-fe0f",
      "keywords": [
        "宗教",
        "犹太",
        "六芒星",
        "大卫之星"
      ]
    },
    {
      "unified": "2638-fe0f",
      "keywords": [
        "佛",
        "法轮",
        "宗教",
        "达摩"
      ]
    },
    {
      "unified": "262f-fe0f",
      "keywords": [
        "道",
        "阳",
        "阴",
        "阴阳",
        "太极",
        "宗教",
        "道教"
      ]
    },
    {
      "unified": "271d-fe0f",
      "keywords": [
        "基督",
        "宗教",
        "十字架",
        "天主教"
      ]
    },
    {
      "unified": "2626-fe0f",
      "keywords": [
        "基督",
        "宗教",
        "东正教",
        "十字架",
        "东正教十字架"
      ]
    },
    {
      "unified": "262a-fe0f",
      "keywords": [
        "星月",
        "宗教",
        "伊斯兰",
        "穆斯林"
      ]
    },
    {
      "unified": "262e-fe0f",
      "keywords": [
        "和平",
        "和平符号"
      ]
    },
    {
      "unified": "1f54e",
      "keywords": [
        "烛台",
        "宗教",
        "灯台",
        "光明节"
      ]
    },
    {
      "unified": "1f52f",
      "keywords": [
        "命运",
        "六角星",
        "带中间点的六芒星"
      ]
    },
    {
      "unified": "1faaf",
      "keywords": [
        "坎达",
        "宗教",
        "锡克"
      ]
    },
    {
      "unified": "2648",
      "keywords": [
        "公羊",
        "星座",
        "白羊座"
      ]
    },
    {
      "unified": "2649",
      "keywords": [
        "公牛",
        "星座",
        "金牛座"
      ]
    },
    {
      "unified": "264a",
      "keywords": [
        "星座",
        "双子座",
        "孪生子"
      ]
    },
    {
      "unified": "264b",
      "keywords": [
        "星座",
        "螃蟹",
        "巨蟹座"
      ]
    },
    {
      "unified": "264c",
      "keywords": [
        "星座",
        "雄狮",
        "狮子座"
      ]
    },
    {
      "unified": "264d",
      "keywords": [
        "星座",
        "处女座",
        "黄道十二宫"
      ]
    },
    {
      "unified": "264e",
      "keywords": [
        "平衡",
        "星座",
        "正义",
        "天秤座"
      ]
    },
    {
      "unified": "264f",
      "keywords": [
        "星座",
        "蝎子",
        "天蝎座"
      ]
    },
    {
      "unified": "2650",
      "keywords": [
        "星座",
        "射手座",
        "弓箭手"
      ]
    },
    {
      "unified": "2651",
      "keywords": [
        "山羊",
        "星座",
        "摩羯座"
      ]
    },
    {
      "unified": "2652",
      "keywords": [
        "水",
        "星座",
        "水瓶座"
      ]
    },
    {
      "unified": "2653",
      "keywords": [
        "鱼",
        "星座",
        "双鱼座"
      ]
    },
    {
      "unified": "26ce",
      "keywords": [
        "蛇",
        "星座",
        "蛇夫座"
      ]
    },
    {
      "unified": "1f500",
      "keywords": [
        "交叉",
        "打乱",
        "随机",
        "随机播放音轨按钮"
      ]
    },
    {
      "unified": "1f501",
      "keywords": [
        "箭头",
        "顺时针",
        "重复按钮",
        "循环播放"
      ]
    },
    {
      "unified": "1f502",
      "keywords": [
        "循环",
        "箭头",
        "顺时针",
        "单曲循环",
        "重复一次按钮"
      ]
    },
    {
      "unified": "25b6-fe0f",
      "keywords": [
        "三角",
        "向右",
        "箭头",
        "播放按钮"
      ]
    },
    {
      "unified": "23e9",
      "keywords": [
        "向前",
        "快速",
        "双箭头",
        "快进按钮"
      ]
    },
    {
      "unified": "23ed-fe0f",
      "keywords": [
        "三角",
        "往后",
        "箭头",
        "下一个音轨按钮"
      ]
    },
    {
      "unified": "23ef-fe0f",
      "keywords": [
        "三角",
        "向右",
        "播放或暂停按钮"
      ]
    },
    {
      "unified": "25c0-fe0f",
      "keywords": [
        "三角",
        "后退",
        "向左",
        "倒退按钮"
      ]
    },
    {
      "unified": "23ea",
      "keywords": [
        "倒回",
        "双箭头",
        "快退按钮"
      ]
    },
    {
      "unified": "23ee-fe0f",
      "keywords": [
        "三角",
        "箭头",
        "上一个音轨按钮"
      ]
    },
    {
      "unified": "1f53c",
      "keywords": [
        "往上",
        "箭头",
        "向上三角形按钮"
      ]
    },
    {
      "unified": "23eb",
      "keywords": [
        "向上",
        "双箭头",
        "快速上升按钮"
      ]
    },
    {
      "unified": "1f53d",
      "keywords": [
        "往下",
        "箭头",
        "向下三角形按钮"
      ]
    },
    {
      "unified": "23ec",
      "keywords": [
        "向下",
        "双箭头",
        "快速下降按钮"
      ]
    },
    {
      "unified": "23f8-fe0f",
      "keywords": [
        "停止",
        "双条形",
        "暂停按钮"
      ]
    },
    {
      "unified": "23f9-fe0f",
      "keywords": [
        "方形",
        "终止",
        "停止按钮"
      ]
    },
    {
      "unified": "23fa-fe0f",
      "keywords": [
        "圆",
        "制作",
        "录制按钮"
      ]
    },
    {
      "unified": "23cf-fe0f",
      "keywords": [
        "弹出",
        "推出按钮",
        "向上三角"
      ]
    },
    {
      "unified": "1f3a6",
      "keywords": [
        "场所",
        "影片",
        "电影院"
      ]
    },
    {
      "unified": "1f505",
      "keywords": [
        "低",
        "亮度",
        "昏暗",
        "低亮度按钮"
      ]
    },
    {
      "unified": "1f506",
      "keywords": [
        "亮度",
        "太阳",
        "明亮",
        "高亮度按钮"
      ]
    },
    {
      "unified": "1f4f6",
      "keywords": [
        "条",
        "天线",
        "手机",
        "信号强度条"
      ]
    },
    {
      "unified": "1f6dc",
      "keywords": [
        "无线",
        "电脑",
        "网络",
        "互联网",
        "计算机"
      ]
    },
    {
      "unified": "1f4f3",
      "keywords": [
        "手机",
        "震动",
        "振动模式"
      ]
    },
    {
      "unified": "1f4f4",
      "keywords": [
        "关闭",
        "手机",
        "手机关机"
      ]
    },
    {
      "unified": "2640-fe0f",
      "keywords": [
        "符号",
        "雌性",
        "女性符号"
      ]
    },
    {
      "unified": "2642-fe0f",
      "keywords": [
        "符号",
        "雄性",
        "男性符号"
      ]
    },
    {
      "unified": "26a7-fe0f",
      "keywords": [
        "跨性别",
        "跨性别符号"
      ]
    },
    {
      "unified": "2716-fe0f",
      "keywords": [
        "乘",
        "乘号",
        "取消",
        "相乘",
        "符号"
      ]
    },
    {
      "unified": "2795",
      "keywords": [
        "加",
        "加号",
        "十字",
        "数学",
        "相加",
        "符号"
      ]
    },
    {
      "unified": "2796",
      "keywords": [
        "减",
        "减号",
        "数学",
        "横线",
        "符号"
      ]
    },
    {
      "unified": "2797",
      "keywords": [
        "除",
        "数学",
        "相除",
        "符号",
        "除号"
      ]
    },
    {
      "unified": "1f7f0",
      "keywords": [
        "平等",
        "数学",
        "相等",
        "等号",
        "粗等号"
      ]
    },
    {
      "unified": "267e-fe0f",
      "keywords": [
        "宇宙",
        "无尽",
        "极大",
        "无穷大"
      ]
    },
    {
      "unified": "203c-fe0f",
      "keywords": [
        "！",
        "两个",
        "吃惊",
        "！！",
        "双感叹号",
        "标点符号"
      ]
    },
    {
      "unified": "2049-fe0f",
      "keywords": [
        "！",
        "？",
        "吃惊",
        "问号",
        "！？",
        "标点符号",
        "感叹疑问号"
      ]
    },
    {
      "unified": "2753",
      "keywords": [
        "问号",
        "为什么",
        "红色问号",
        "标点符号"
      ]
    },
    {
      "unified": "2754",
      "keywords": [
        "？",
        "空心",
        "为什么",
        "白色问号",
        "标点符号"
      ]
    },
    {
      "unified": "2755",
      "keywords": [
        "！",
        "吃惊",
        "空心",
        "标点符号",
        "白色感叹号"
      ]
    },
    {
      "unified": "2757",
      "keywords": [
        "！",
        "吃惊",
        "感叹号",
        "标点符号",
        "红色感叹号"
      ]
    },
    {
      "unified": "3030-fe0f",
      "keywords": [
        "浪花",
        "标点符号",
        "波浪型破折号"
      ]
    },
    {
      "unified": "1f4b1",
      "keywords": [
        "兑换",
        "外汇",
        "换汇",
        "汇率",
        "流通",
        "货币兑换"
      ]
    },
    {
      "unified": "1f4b2",
      "keywords": [
        "美元",
        "货币",
        "金钱",
        "粗美元符号"
      ]
    },
    {
      "unified": "2695-fe0f",
      "keywords": [
        "蛇杖",
        "医疗标志",
        "阿斯克勒庇俄斯"
      ]
    },
    {
      "unified": "267b-fe0f",
      "keywords": [
        "循环",
        "再利用",
        "回收标志"
      ]
    },
    {
      "unified": "269c-fe0f",
      "keywords": [
        "鸢尾花",
        "百合花饰"
      ]
    },
    {
      "unified": "1f531",
      "keywords": [
        "船",
        "锚",
        "工具",
        "三叉戟徽章"
      ]
    },
    {
      "unified": "1f4db",
      "keywords": [
        "胸牌",
        "证章",
        "姓名牌"
      ]
    },
    {
      "unified": "1f530",
      "keywords": [
        "叶状",
        "实习",
        "箭尾",
        "v形图案",
        "日本新手驾驶标志"
      ]
    },
    {
      "unified": "2b55",
      "keywords": [
        "大",
        "红",
        "o形",
        "圆圈",
        "红色空心圆圈"
      ]
    },
    {
      "unified": "2705",
      "keywords": [
        "勾",
        "勾号",
        "打勾",
        "按钮",
        "勾号按钮"
      ]
    },
    {
      "unified": "2611-fe0f",
      "keywords": [
        "勾号",
        "打勾",
        "勾选框",
        "复选框",
        "带勾方格"
      ]
    },
    {
      "unified": "2714-fe0f",
      "keywords": [
        "勾号",
        "对勾",
        "打勾",
        "正确",
        "符号"
      ]
    },
    {
      "unified": "274c",
      "keywords": [
        "叉号",
        "交叉",
        "取消",
        "相乘",
        "符号"
      ]
    },
    {
      "unified": "274e",
      "keywords": [
        "取消",
        "方形",
        "叉号按钮"
      ]
    },
    {
      "unified": "27b0",
      "keywords": [
        "单环",
        "标志",
        "卷曲环"
      ]
    },
    {
      "unified": "27bf",
      "keywords": [
        "双环",
        "标志",
        "双卷曲环"
      ]
    },
    {
      "unified": "303d-fe0f",
      "keywords": [
        "庵点",
        "符号",
        "开始歌唱"
      ]
    },
    {
      "unified": "2733-fe0f",
      "keywords": [
        "星号",
        "八轮辐星号"
      ]
    },
    {
      "unified": "2734-fe0f",
      "keywords": [
        "星",
        "符号",
        "八角星"
      ]
    },
    {
      "unified": "2747-fe0f",
      "keywords": [
        "火花",
        "烟火",
        "闪耀"
      ]
    },
    {
      "unified": "00a9-fe0f",
      "keywords": [
        "版权"
      ]
    },
    {
      "unified": "00ae-fe0f",
      "keywords": [
        "注册",
        "注册标记"
      ]
    },
    {
      "unified": "2122-fe0f",
      "keywords": [
        "商标",
        "产品",
        "标志"
      ]
    },
    {
      "unified": "0023-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: #"
      ]
    },
    {
      "unified": "002a-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: *"
      ]
    },
    {
      "unified": "0030-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 0"
      ]
    },
    {
      "unified": "0031-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 1"
      ]
    },
    {
      "unified": "0032-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 2"
      ]
    },
    {
      "unified": "0033-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 3"
      ]
    },
    {
      "unified": "0034-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 4"
      ]
    },
    {
      "unified": "0035-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 5"
      ]
    },
    {
      "unified": "0036-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 6"
      ]
    },
    {
      "unified": "0037-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 7"
      ]
    },
    {
      "unified": "0038-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 8"
      ]
    },
    {
      "unified": "0039-fe0f-20e3",
      "keywords": [
        "按键",
        "按键: 9"
      ]
    },
    {
      "unified": "1f51f",
      "keywords": [
        "按键",
        "按键: 10"
      ]
    },
    {
      "unified": "1f520",
      "keywords": [
        "打字",
        "拉丁文",
        "输入法",
        "abcd",
        "输入大写拉丁字母"
      ]
    },
    {
      "unified": "1f521",
      "keywords": [
        "打字",
        "拉丁文",
        "输入法",
        "abcd",
        "输入小写拉丁字母"
      ]
    },
    {
      "unified": "1f522",
      "keywords": [
        "打字",
        "输入数字",
        "1234"
      ]
    },
    {
      "unified": "1f523",
      "keywords": [
        "字符",
        "打字",
        "输入符号"
      ]
    },
    {
      "unified": "1f524",
      "keywords": [
        "字母",
        "打字",
        "abc",
        "拉丁文",
        "输入拉丁字母"
      ]
    },
    {
      "unified": "1f170-fe0f",
      "keywords": [
        "a",
        "按钮",
        "血液",
        "A型血",
        "a型血"
      ]
    },
    {
      "unified": "1f18e",
      "keywords": [
        "ab",
        "按钮",
        "血液",
        "AB型血",
        "ab型血"
      ]
    },
    {
      "unified": "1f171-fe0f",
      "keywords": [
        "b",
        "按钮",
        "血液",
        "B型血",
        "b型血"
      ]
    },
    {
      "unified": "1f191",
      "keywords": [
        "cl",
        "手机",
        "清理",
        "CL按钮",
        "cl按钮"
      ]
    },
    {
      "unified": "1f192",
      "keywords": [
        "酷",
        "按键",
        "cool按钮"
      ]
    },
    {
      "unified": "1f193",
      "keywords": [
        "按钮",
        "不收费",
        "免费按钮"
      ]
    },
    {
      "unified": "2139-fe0f",
      "keywords": [
        "信息",
        "查询",
        "资料"
      ]
    },
    {
      "unified": "1f194",
      "keywords": [
        "按键",
        "识别",
        "身份",
        "ID按钮",
        "id按钮"
      ]
    },
    {
      "unified": "24c2-fe0f",
      "keywords": [
        "圈",
        "米",
        "字母",
        "圆圈包围的M",
        "圆圈包围的m"
      ]
    },
    {
      "unified": "1f195",
      "keywords": [
        "按键",
        "新的",
        "new按钮"
      ]
    },
    {
      "unified": "1f196",
      "keywords": [
        "按键",
        "花絮",
        "NG按钮",
        "ng按钮"
      ]
    },
    {
      "unified": "1f17e-fe0f",
      "keywords": [
        "o",
        "按钮",
        "血液",
        "o型血",
        "O 型血",
        "o 型血"
      ]
    },
    {
      "unified": "1f197",
      "keywords": [
        "同意",
        "按键",
        "OK按钮",
        "ok按钮"
      ]
    },
    {
      "unified": "1f17f-fe0f",
      "keywords": [
        "按键",
        "泊车",
        "停车按钮"
      ]
    },
    {
      "unified": "1f198",
      "keywords": [
        "按键",
        "求救",
        "SOS按钮",
        "sos按钮"
      ]
    },
    {
      "unified": "1f199",
      "keywords": [
        "向上",
        "按键",
        "up按钮"
      ]
    },
    {
      "unified": "1f19a",
      "keywords": [
        "对决",
        "按键",
        "VS按钮",
        "vs按钮"
      ]
    },
    {
      "unified": "1f201",
      "keywords": [
        "按键",
        "日文",
        "此处",
        "日文的“这里”按钮"
      ]
    },
    {
      "unified": "1f202-fe0f",
      "keywords": [
        "按键",
        "收费",
        "日文",
        "服务",
        "日文的“服务费”按钮"
      ]
    },
    {
      "unified": "1f237-fe0f",
      "keywords": [
        "按键",
        "日文",
        "月度",
        "统计",
        "日文的“月总量”按钮"
      ]
    },
    {
      "unified": "1f236",
      "keywords": [
        "按键",
        "日文",
        "费用",
        "日文的“收费”按钮"
      ]
    },
    {
      "unified": "1f22f",
      "keywords": [
        "按键",
        "日文",
        "预订",
        "日文的“预留”按钮"
      ]
    },
    {
      "unified": "1f250",
      "keywords": [
        "按键",
        "日文",
        "讨价还价",
        "日文的“议价”按钮"
      ]
    },
    {
      "unified": "1f239",
      "keywords": [
        "折扣",
        "按键",
        "日文",
        "日文的“打折”按钮"
      ]
    },
    {
      "unified": "1f21a",
      "keywords": [
        "免费",
        "按键",
        "日文",
        "日文的“免费”按钮"
      ]
    },
    {
      "unified": "1f232",
      "keywords": [
        "严禁",
        "按键",
        "日文",
        "日文的“禁止”按钮"
      ]
    },
    {
      "unified": "1f251",
      "keywords": [
        "按键",
        "日文",
        "许可",
        "日文的“可接受”按钮"
      ]
    },
    {
      "unified": "1f238",
      "keywords": [
        "申",
        "日文",
        "日语",
        "申请",
        "申请书",
        "申请表",
        "日文的“申请”按钮"
      ]
    },
    {
      "unified": "1f234",
      "keywords": [
        "按键",
        "日文",
        "通过",
        "日文的“合格”按钮"
      ]
    },
    {
      "unified": "1f233",
      "keywords": [
        "空",
        "日文",
        "日语",
        "空位",
        "空闲",
        "有空位",
        "日文的“有空位”按钮"
      ]
    },
    {
      "unified": "3297-fe0f",
      "keywords": [
        "庆贺",
        "按键",
        "日文",
        "日文的“祝贺”按钮"
      ]
    },
    {
      "unified": "3299-fe0f",
      "keywords": [
        "保密",
        "按键",
        "日文",
        "日文的“秘密”按钮"
      ]
    },
    {
      "unified": "1f23a",
      "keywords": [
        "开门",
        "按键",
        "日文",
        "日文的“开始营业”按钮"
      ]
    },
    {
      "unified": "1f235",
      "keywords": [
        "满",
        "座位",
        "按键",
        "日文",
        "日文的“没有空位”按钮"
      ]
    },
    {
      "unified": "1f534",
      "keywords": [
        "圆",
        "圈",
        "红",
        "红色",
        "红色圆"
      ]
    },
    {
      "unified": "1f7e0",
      "keywords": [
        "圆",
        "圈",
        "橙",
        "橙色圆"
      ]
    },
    {
      "unified": "1f7e1",
      "keywords": [
        "圆",
        "圈",
        "黄",
        "黄色圆"
      ]
    },
    {
      "unified": "1f7e2",
      "keywords": [
        "圆",
        "圈",
        "绿",
        "绿色圆"
      ]
    },
    {
      "unified": "1f535",
      "keywords": [
        "圈",
        "蓝",
        "蓝色圆"
      ]
    },
    {
      "unified": "1f7e3",
      "keywords": [
        "圆",
        "圈",
        "紫",
        "紫色圆"
      ]
    },
    {
      "unified": "1f7e4",
      "keywords": [
        "圆",
        "圈",
        "棕",
        "棕色圆"
      ]
    },
    {
      "unified": "26ab",
      "keywords": [
        "圈",
        "黑",
        "黑色圆"
      ]
    },
    {
      "unified": "26aa",
      "keywords": [
        "圈",
        "白",
        "白色圆"
      ]
    },
    {
      "unified": "1f7e5",
      "keywords": [
        "红",
        "方块",
        "方框",
        "正方形",
        "红色方块"
      ]
    },
    {
      "unified": "1f7e7",
      "keywords": [
        "橙",
        "方块",
        "方框",
        "正方形",
        "橙色方块"
      ]
    },
    {
      "unified": "1f7e8",
      "keywords": [
        "黄",
        "方块",
        "方框",
        "正方形",
        "黄色方块"
      ]
    },
    {
      "unified": "1f7e9",
      "keywords": [
        "绿",
        "方块",
        "方框",
        "正方形",
        "绿色方块"
      ]
    },
    {
      "unified": "1f7e6",
      "keywords": [
        "蓝",
        "方块",
        "方框",
        "正方形",
        "蓝色方块"
      ]
    },
    {
      "unified": "1f7ea",
      "keywords": [
        "紫",
        "方块",
        "方框",
        "正方形",
        "紫色方块"
      ]
    },
    {
      "unified": "1f7eb",
      "keywords": [
        "棕",
        "方块",
        "方框",
        "正方形",
        "棕色方块"
      ]
    },
    {
      "unified": "2b1b",
      "keywords": [
        "大",
        "黑色",
        "正方形",
        "黑线大方框"
      ]
    },
    {
      "unified": "2b1c",
      "keywords": [
        "大",
        "白色",
        "正方形",
        "白线大方框"
      ]
    },
    {
      "unified": "25fc-fe0f",
      "keywords": [
        "中等",
        "黑色",
        "正方形",
        "黑色中方块"
      ]
    },
    {
      "unified": "25fb-fe0f",
      "keywords": [
        "中等",
        "白色",
        "正方形",
        "白色中方块"
      ]
    },
    {
      "unified": "25fe",
      "keywords": [
        "中小",
        "黑色",
        "正方形",
        "黑色中小方块"
      ]
    },
    {
      "unified": "25fd",
      "keywords": [
        "白色",
        "白色中小方块",
        "中小 正方形"
      ]
    },
    {
      "unified": "25aa-fe0f",
      "keywords": [
        "小",
        "黑色",
        "正方形",
        "黑色小方块"
      ]
    },
    {
      "unified": "25ab-fe0f",
      "keywords": [
        "小",
        "白色",
        "正方形",
        "白色小方块"
      ]
    },
    {
      "unified": "1f536",
      "keywords": [
        "大",
        "方片",
        "橘黄色",
        "橙色大菱形"
      ]
    },
    {
      "unified": "1f537",
      "keywords": [
        "大",
        "方片",
        "蓝色",
        "蓝色大菱形"
      ]
    },
    {
      "unified": "1f538",
      "keywords": [
        "小",
        "方片",
        "橘黄色",
        "橙色小菱形"
      ]
    },
    {
      "unified": "1f539",
      "keywords": [
        "小",
        "方片",
        "蓝色",
        "蓝色小菱形"
      ]
    },
    {
      "unified": "1f53a",
      "keywords": [
        "向上",
        "红色",
        "三角形",
        "正三角",
        "红色正三角"
      ]
    },
    {
      "unified": "1f53b",
      "keywords": [
        "向下",
        "红色",
        "三角形",
        "倒三角",
        "红色倒三角"
      ]
    },
    {
      "unified": "1f4a0",
      "keywords": [
        "圆",
        "中心",
        "内部",
        "梅花形",
        "带圆点的菱形"
      ]
    },
    {
      "unified": "1f518",
      "keywords": [
        "单独",
        "圆心",
        "按键",
        "选中",
        "单选按钮"
      ]
    },
    {
      "unified": "1f533",
      "keywords": [
        "按钮",
        "白色方形按钮",
        "白线方形按钮",
        "白线正方形按钮",
        "白色正方形按钮",
        "白边线方形按钮",
        "白边线正方形按钮"
      ]
    },
    {
      "unified": "1f532",
      "keywords": [
        "按钮",
        "黑色方形按钮",
        "黑线方形按钮",
        "黑线正方形按钮",
        "黑色正方形按钮",
        "黑边线方形按钮",
        "黑边线正方形按钮"
      ]
    }
  ],
  "flags": [
    {
      "unified": "1f3c1",
      "keywords": [
        "终点旗",
        "格子旗"
      ]
    },
    {
      "unified": "1f6a9",
      "keywords": [
        "旗",
        "升旗",
        "三角旗",
        "红色旗帜",
        "旗杆上的旗帜",
        "旗杆上的三角旗"
      ]
    },
    {
      "unified": "1f38c",
      "keywords": [
        "对叉",
        "旗帜",
        "日本",
        "交叉旗"
      ]
    },
    {
      "unified": "1f3f4",
      "keywords": [
        "黑旗",
        "举黑旗",
        "黑色旗",
        "黑色旗子",
        "黑色旗帜"
      ]
    },
    {
      "unified": "1f3f3-fe0f",
      "keywords": [
        "白旗",
        "举白旗",
        "白色旗子",
        "白色旗帜"
      ]
    },
    {
      "unified": "1f3f3-fe0f-200d-1f308",
      "keywords": [
        "同性",
        "多色",
        "旗帜",
        "彩虹旗"
      ]
    },
    {
      "unified": "1f3f3-fe0f-200d-26a7-fe0f",
      "keywords": [
        "旗帜",
        "白色",
        "浅蓝色",
        "粉红色",
        "跨性别",
        "跨性别旗"
      ]
    },
    {
      "unified": "1f3f4-200d-2620-fe0f",
      "keywords": [
        "掠夺",
        "海上",
        "财宝",
        "骷髅",
        "海盗旗"
      ]
    },
    {
      "unified": "1f1e6-1f1e8",
      "keywords": [
        "旗",
        "AC",
        "旗: 阿森松岛"
      ]
    },
    {
      "unified": "1f1e6-1f1e9",
      "keywords": [
        "旗",
        "AD",
        "旗: 安道尔"
      ]
    },
    {
      "unified": "1f1e6-1f1ea",
      "keywords": [
        "旗",
        "AE",
        "旗: 阿拉伯联合酋长国"
      ]
    },
    {
      "unified": "1f1e6-1f1eb",
      "keywords": [
        "旗",
        "AF",
        "旗: 阿富汗"
      ]
    },
    {
      "unified": "1f1e6-1f1ec",
      "keywords": [
        "旗",
        "AG",
        "旗: 安提瓜和巴布达"
      ]
    },
    {
      "unified": "1f1e6-1f1ee",
      "keywords": [
        "旗",
        "AI",
        "旗: 安圭拉"
      ]
    },
    {
      "unified": "1f1e6-1f1f1",
      "keywords": [
        "旗",
        "AL",
        "旗: 阿尔巴尼亚"
      ]
    },
    {
      "unified": "1f1e6-1f1f2",
      "keywords": [
        "旗",
        "AM",
        "旗: 亚美尼亚"
      ]
    },
    {
      "unified": "1f1e6-1f1f4",
      "keywords": [
        "旗",
        "AO",
        "旗: 安哥拉"
      ]
    },
    {
      "unified": "1f1e6-1f1f6",
      "keywords": [
        "旗",
        "AQ",
        "旗: 南极洲"
      ]
    },
    {
      "unified": "1f1e6-1f1f7",
      "keywords": [
        "旗",
        "AR",
        "旗: 阿根廷"
      ]
    },
    {
      "unified": "1f1e6-1f1f8",
      "keywords": [
        "旗",
        "AS",
        "旗: 美属萨摩亚"
      ]
    },
    {
      "unified": "1f1e6-1f1f9",
      "keywords": [
        "旗",
        "AT",
        "旗: 奥地利"
      ]
    },
    {
      "unified": "1f1e6-1f1fa",
      "keywords": [
        "旗",
        "AU",
        "旗: 澳大利亚"
      ]
    },
    {
      "unified": "1f1e6-1f1fc",
      "keywords": [
        "旗",
        "AW",
        "旗: 阿鲁巴"
      ]
    },
    {
      "unified": "1f1e6-1f1fd",
      "keywords": [
        "旗",
        "AX",
        "旗: 奥兰群岛"
      ]
    },
    {
      "unified": "1f1e6-1f1ff",
      "keywords": [
        "旗",
        "AZ",
        "旗: 阿塞拜疆"
      ]
    },
    {
      "unified": "1f1e7-1f1e6",
      "keywords": [
        "旗",
        "BA",
        "旗: 波斯尼亚和黑塞哥维那"
      ]
    },
    {
      "unified": "1f1e7-1f1e7",
      "keywords": [
        "旗",
        "BB",
        "旗: 巴巴多斯"
      ]
    },
    {
      "unified": "1f1e7-1f1e9",
      "keywords": [
        "旗",
        "BD",
        "旗: 孟加拉国"
      ]
    },
    {
      "unified": "1f1e7-1f1ea",
      "keywords": [
        "旗",
        "BE",
        "旗: 比利时"
      ]
    },
    {
      "unified": "1f1e7-1f1eb",
      "keywords": [
        "旗",
        "BF",
        "旗: 布基纳法索"
      ]
    },
    {
      "unified": "1f1e7-1f1ec",
      "keywords": [
        "旗",
        "BG",
        "旗: 保加利亚"
      ]
    },
    {
      "unified": "1f1e7-1f1ed",
      "keywords": [
        "旗",
        "BH",
        "旗: 巴林"
      ]
    },
    {
      "unified": "1f1e7-1f1ee",
      "keywords": [
        "旗",
        "BI",
        "旗: 布隆迪"
      ]
    },
    {
      "unified": "1f1e7-1f1ef",
      "keywords": [
        "旗",
        "BJ",
        "旗: 贝宁"
      ]
    },
    {
      "unified": "1f1e7-1f1f1",
      "keywords": [
        "旗",
        "BL",
        "旗: 圣巴泰勒米"
      ]
    },
    {
      "unified": "1f1e7-1f1f2",
      "keywords": [
        "旗",
        "BM",
        "旗: 百慕大"
      ]
    },
    {
      "unified": "1f1e7-1f1f3",
      "keywords": [
        "旗",
        "BN",
        "旗: 文莱"
      ]
    },
    {
      "unified": "1f1e7-1f1f4",
      "keywords": [
        "旗",
        "BO",
        "旗: 玻利维亚"
      ]
    },
    {
      "unified": "1f1e7-1f1f6",
      "keywords": [
        "旗",
        "BQ",
        "旗: 荷属加勒比区"
      ]
    },
    {
      "unified": "1f1e7-1f1f7",
      "keywords": [
        "旗",
        "BR",
        "旗: 巴西"
      ]
    },
    {
      "unified": "1f1e7-1f1f8",
      "keywords": [
        "旗",
        "BS",
        "旗: 巴哈马"
      ]
    },
    {
      "unified": "1f1e7-1f1f9",
      "keywords": [
        "旗",
        "BT",
        "旗: 不丹"
      ]
    },
    {
      "unified": "1f1e7-1f1fb",
      "keywords": [
        "旗",
        "BV",
        "旗: 布韦岛"
      ]
    },
    {
      "unified": "1f1e7-1f1fc",
      "keywords": [
        "旗",
        "BW",
        "旗: 博茨瓦纳"
      ]
    },
    {
      "unified": "1f1e7-1f1fe",
      "keywords": [
        "旗",
        "BY",
        "旗: 白俄罗斯"
      ]
    },
    {
      "unified": "1f1e7-1f1ff",
      "keywords": [
        "旗",
        "BZ",
        "旗: 伯利兹"
      ]
    },
    {
      "unified": "1f1e8-1f1e6",
      "keywords": [
        "旗",
        "CA",
        "旗: 加拿大"
      ]
    },
    {
      "unified": "1f1e8-1f1e8",
      "keywords": [
        "旗",
        "CC",
        "旗: 科科斯（基林）群岛"
      ]
    },
    {
      "unified": "1f1e8-1f1e9",
      "keywords": [
        "旗",
        "CD",
        "旗: 刚果（金）"
      ]
    },
    {
      "unified": "1f1e8-1f1eb",
      "keywords": [
        "旗",
        "CF",
        "旗: 中非共和国"
      ]
    },
    {
      "unified": "1f1e8-1f1ec",
      "keywords": [
        "旗",
        "CG",
        "旗: 刚果（布）"
      ]
    },
    {
      "unified": "1f1e8-1f1ed",
      "keywords": [
        "旗",
        "CH",
        "旗: 瑞士"
      ]
    },
    {
      "unified": "1f1e8-1f1ee",
      "keywords": [
        "旗",
        "CI",
        "旗: 科特迪瓦"
      ]
    },
    {
      "unified": "1f1e8-1f1f0",
      "keywords": [
        "旗",
        "CK",
        "旗: 库克群岛"
      ]
    },
    {
      "unified": "1f1e8-1f1f1",
      "keywords": [
        "旗",
        "CL",
        "旗: 智利"
      ]
    },
    {
      "unified": "1f1e8-1f1f2",
      "keywords": [
        "旗",
        "CM",
        "旗: 喀麦隆"
      ]
    },
    {
      "unified": "1f1e8-1f1f3",
      "keywords": [
        "旗",
        "CN",
        "旗: 中国"
      ]
    },
    {
      "unified": "1f1e8-1f1f4",
      "keywords": [
        "旗",
        "CO",
        "旗: 哥伦比亚"
      ]
    },
    {
      "unified": "1f1e8-1f1f5",
      "keywords": [
        "旗",
        "CP",
        "旗: 克利珀顿岛"
      ]
    },
    {
      "unified": "1f1e8-1f1f7",
      "keywords": [
        "旗",
        "CR",
        "旗: 哥斯达黎加"
      ]
    },
    {
      "unified": "1f1e8-1f1fa",
      "keywords": [
        "旗",
        "CU",
        "旗: 古巴"
      ]
    },
    {
      "unified": "1f1e8-1f1fb",
      "keywords": [
        "旗",
        "CV",
        "旗: 佛得角"
      ]
    },
    {
      "unified": "1f1e8-1f1fc",
      "keywords": [
        "旗",
        "CW",
        "旗: 库拉索"
      ]
    },
    {
      "unified": "1f1e8-1f1fd",
      "keywords": [
        "旗",
        "CX",
        "旗: 圣诞岛"
      ]
    },
    {
      "unified": "1f1e8-1f1fe",
      "keywords": [
        "旗",
        "CY",
        "旗: 塞浦路斯"
      ]
    },
    {
      "unified": "1f1e8-1f1ff",
      "keywords": [
        "旗",
        "CZ",
        "旗: 捷克"
      ]
    },
    {
      "unified": "1f1e9-1f1ea",
      "keywords": [
        "旗",
        "DE",
        "旗: 德国"
      ]
    },
    {
      "unified": "1f1e9-1f1ec",
      "keywords": [
        "旗",
        "DG",
        "旗: 迪戈加西亚岛"
      ]
    },
    {
      "unified": "1f1e9-1f1ef",
      "keywords": [
        "旗",
        "DJ",
        "旗: 吉布提"
      ]
    },
    {
      "unified": "1f1e9-1f1f0",
      "keywords": [
        "旗",
        "DK",
        "旗: 丹麦"
      ]
    },
    {
      "unified": "1f1e9-1f1f2",
      "keywords": [
        "旗",
        "DM",
        "旗: 多米尼克"
      ]
    },
    {
      "unified": "1f1e9-1f1f4",
      "keywords": [
        "旗",
        "DO",
        "旗: 多米尼加共和国"
      ]
    },
    {
      "unified": "1f1e9-1f1ff",
      "keywords": [
        "旗",
        "DZ",
        "旗: 阿尔及利亚"
      ]
    },
    {
      "unified": "1f1ea-1f1e6",
      "keywords": [
        "旗",
        "EA",
        "旗: 休达及梅利利亚"
      ]
    },
    {
      "unified": "1f1ea-1f1e8",
      "keywords": [
        "旗",
        "EC",
        "旗: 厄瓜多尔"
      ]
    },
    {
      "unified": "1f1ea-1f1ea",
      "keywords": [
        "旗",
        "EE",
        "旗: 爱沙尼亚"
      ]
    },
    {
      "unified": "1f1ea-1f1ec",
      "keywords": [
        "旗",
        "EG",
        "旗: 埃及"
      ]
    },
    {
      "unified": "1f1ea-1f1ed",
      "keywords": [
        "旗",
        "EH",
        "旗: 西撒哈拉"
      ]
    },
    {
      "unified": "1f1ea-1f1f7",
      "keywords": [
        "旗",
        "ER",
        "旗: 厄立特里亚"
      ]
    },
    {
      "unified": "1f1ea-1f1f8",
      "keywords": [
        "旗",
        "ES",
        "旗: 西班牙"
      ]
    },
    {
      "unified": "1f1ea-1f1f9",
      "keywords": [
        "旗",
        "ET",
        "旗: 埃塞俄比亚"
      ]
    },
    {
      "unified": "1f1ea-1f1fa",
      "keywords": [
        "旗",
        "EU",
        "旗: 欧盟"
      ]
    },
    {
      "unified": "1f1eb-1f1ee",
      "keywords": [
        "旗",
        "FI",
        "旗: 芬兰"
      ]
    },
    {
      "unified": "1f1eb-1f1ef",
      "keywords": [
        "旗",
        "FJ",
        "旗: 斐济"
      ]
    },
    {
      "unified": "1f1eb-1f1f0",
      "keywords": [
        "旗",
        "FK",
        "旗: 福克兰群岛"
      ]
    },
    {
      "unified": "1f1eb-1f1f2",
      "keywords": [
        "旗",
        "FM",
        "旗: 密克罗尼西亚"
      ]
    },
    {
      "unified": "1f1eb-1f1f4",
      "keywords": [
        "旗",
        "FO",
        "旗: 法罗群岛"
      ]
    },
    {
      "unified": "1f1eb-1f1f7",
      "keywords": [
        "旗",
        "FR",
        "旗: 法国"
      ]
    },
    {
      "unified": "1f1ec-1f1e6",
      "keywords": [
        "旗",
        "GA",
        "旗: 加蓬"
      ]
    },
    {
      "unified": "1f1ec-1f1e7",
      "keywords": [
        "旗",
        "GB",
        "旗: 英国"
      ]
    },
    {
      "unified": "1f1ec-1f1e9",
      "keywords": [
        "旗",
        "GD",
        "旗: 格林纳达"
      ]
    },
    {
      "unified": "1f1ec-1f1ea",
      "keywords": [
        "旗",
        "GE",
        "旗: 格鲁吉亚"
      ]
    },
    {
      "unified": "1f1ec-1f1eb",
      "keywords": [
        "旗",
        "GF",
        "旗: 法属圭亚那"
      ]
    },
    {
      "unified": "1f1ec-1f1ec",
      "keywords": [
        "旗",
        "GG",
        "旗: 根西岛"
      ]
    },
    {
      "unified": "1f1ec-1f1ed",
      "keywords": [
        "旗",
        "GH",
        "旗: 加纳"
      ]
    },
    {
      "unified": "1f1ec-1f1ee",
      "keywords": [
        "旗",
        "GI",
        "旗: 直布罗陀"
      ]
    },
    {
      "unified": "1f1ec-1f1f1",
      "keywords": [
        "旗",
        "GL",
        "旗: 格陵兰"
      ]
    },
    {
      "unified": "1f1ec-1f1f2",
      "keywords": [
        "旗",
        "GM",
        "旗: 冈比亚"
      ]
    },
    {
      "unified": "1f1ec-1f1f3",
      "keywords": [
        "旗",
        "GN",
        "旗: 几内亚"
      ]
    },
    {
      "unified": "1f1ec-1f1f5",
      "keywords": [
        "旗",
        "GP",
        "旗: 瓜德罗普"
      ]
    },
    {
      "unified": "1f1ec-1f1f6",
      "keywords": [
        "旗",
        "GQ",
        "旗: 赤道几内亚"
      ]
    },
    {
      "unified": "1f1ec-1f1f7",
      "keywords": [
        "旗",
        "GR",
        "旗: 希腊"
      ]
    },
    {
      "unified": "1f1ec-1f1f8",
      "keywords": [
        "旗",
        "GS",
        "旗: 南乔治亚和南桑威奇群岛"
      ]
    },
    {
      "unified": "1f1ec-1f1f9",
      "keywords": [
        "旗",
        "GT",
        "旗: 危地马拉"
      ]
    },
    {
      "unified": "1f1ec-1f1fa",
      "keywords": [
        "旗",
        "GU",
        "旗: 关岛"
      ]
    },
    {
      "unified": "1f1ec-1f1fc",
      "keywords": [
        "旗",
        "GW",
        "旗: 几内亚比绍"
      ]
    },
    {
      "unified": "1f1ec-1f1fe",
      "keywords": [
        "旗",
        "GY",
        "旗: 圭亚那"
      ]
    },
    {
      "unified": "1f1ed-1f1f0",
      "keywords": [
        "旗",
        "HK",
        "旗: 中国香港特别行政区"
      ]
    },
    {
      "unified": "1f1ed-1f1f2",
      "keywords": [
        "旗",
        "HM",
        "旗: 赫德岛和麦克唐纳群岛"
      ]
    },
    {
      "unified": "1f1ed-1f1f3",
      "keywords": [
        "旗",
        "HN",
        "旗: 洪都拉斯"
      ]
    },
    {
      "unified": "1f1ed-1f1f7",
      "keywords": [
        "旗",
        "HR",
        "旗: 克罗地亚"
      ]
    },
    {
      "unified": "1f1ed-1f1f9",
      "keywords": [
        "旗",
        "HT",
        "旗: 海地"
      ]
    },
    {
      "unified": "1f1ed-1f1fa",
      "keywords": [
        "旗",
        "HU",
        "旗: 匈牙利"
      ]
    },
    {
      "unified": "1f1ee-1f1e8",
      "keywords": [
        "旗",
        "IC",
        "旗: 加纳利群岛"
      ]
    },
    {
      "unified": "1f1ee-1f1e9",
      "keywords": [
        "旗",
        "ID",
        "旗: 印度尼西亚"
      ]
    },
    {
      "unified": "1f1ee-1f1ea",
      "keywords": [
        "旗",
        "IE",
        "旗: 爱尔兰"
      ]
    },
    {
      "unified": "1f1ee-1f1f1",
      "keywords": [
        "旗",
        "IL",
        "旗: 以色列"
      ]
    },
    {
      "unified": "1f1ee-1f1f2",
      "keywords": [
        "旗",
        "IM",
        "旗: 马恩岛"
      ]
    },
    {
      "unified": "1f1ee-1f1f3",
      "keywords": [
        "旗",
        "IN",
        "旗: 印度"
      ]
    },
    {
      "unified": "1f1ee-1f1f4",
      "keywords": [
        "旗",
        "IO",
        "旗: 英属印度洋领地"
      ]
    },
    {
      "unified": "1f1ee-1f1f6",
      "keywords": [
        "旗",
        "IQ",
        "旗: 伊拉克"
      ]
    },
    {
      "unified": "1f1ee-1f1f7",
      "keywords": [
        "旗",
        "IR",
        "旗: 伊朗"
      ]
    },
    {
      "unified": "1f1ee-1f1f8",
      "keywords": [
        "旗",
        "IS",
        "旗: 冰岛"
      ]
    },
    {
      "unified": "1f1ee-1f1f9",
      "keywords": [
        "旗",
        "IT",
        "旗: 意大利"
      ]
    },
    {
      "unified": "1f1ef-1f1ea",
      "keywords": [
        "旗",
        "JE",
        "旗: 泽西岛"
      ]
    },
    {
      "unified": "1f1ef-1f1f2",
      "keywords": [
        "旗",
        "JM",
        "旗: 牙买加"
      ]
    },
    {
      "unified": "1f1ef-1f1f4",
      "keywords": [
        "旗",
        "JO",
        "旗: 约旦"
      ]
    },
    {
      "unified": "1f1ef-1f1f5",
      "keywords": [
        "旗",
        "JP",
        "旗: 日本"
      ]
    },
    {
      "unified": "1f1f0-1f1ea",
      "keywords": [
        "旗",
        "KE",
        "旗: 肯尼亚"
      ]
    },
    {
      "unified": "1f1f0-1f1ec",
      "keywords": [
        "旗",
        "KG",
        "旗: 吉尔吉斯斯坦"
      ]
    },
    {
      "unified": "1f1f0-1f1ed",
      "keywords": [
        "旗",
        "KH",
        "旗: 柬埔寨"
      ]
    },
    {
      "unified": "1f1f0-1f1ee",
      "keywords": [
        "旗",
        "KI",
        "旗: 基里巴斯"
      ]
    },
    {
      "unified": "1f1f0-1f1f2",
      "keywords": [
        "旗",
        "KM",
        "旗: 科摩罗"
      ]
    },
    {
      "unified": "1f1f0-1f1f3",
      "keywords": [
        "旗",
        "KN",
        "旗: 圣基茨和尼维斯"
      ]
    },
    {
      "unified": "1f1f0-1f1f5",
      "keywords": [
        "旗",
        "KP",
        "旗: 朝鲜"
      ]
    },
    {
      "unified": "1f1f0-1f1f7",
      "keywords": [
        "旗",
        "KR",
        "旗: 韩国"
      ]
    },
    {
      "unified": "1f1f0-1f1fc",
      "keywords": [
        "旗",
        "KW",
        "旗: 科威特"
      ]
    },
    {
      "unified": "1f1f0-1f1fe",
      "keywords": [
        "旗",
        "KY",
        "旗: 开曼群岛"
      ]
    },
    {
      "unified": "1f1f0-1f1ff",
      "keywords": [
        "旗",
        "KZ",
        "旗: 哈萨克斯坦"
      ]
    },
    {
      "unified": "1f1f1-1f1e6",
      "keywords": [
        "旗",
        "LA",
        "旗: 老挝"
      ]
    },
    {
      "unified": "1f1f1-1f1e7",
      "keywords": [
        "旗",
        "LB",
        "旗: 黎巴嫩"
      ]
    },
    {
      "unified": "1f1f1-1f1e8",
      "keywords": [
        "旗",
        "LC",
        "旗: 圣卢西亚"
      ]
    },
    {
      "unified": "1f1f1-1f1ee",
      "keywords": [
        "旗",
        "LI",
        "旗: 列支敦士登"
      ]
    },
    {
      "unified": "1f1f1-1f1f0",
      "keywords": [
        "旗",
        "LK",
        "旗: 斯里兰卡"
      ]
    },
    {
      "unified": "1f1f1-1f1f7",
      "keywords": [
        "旗",
        "LR",
        "旗: 利比里亚"
      ]
    },
    {
      "unified": "1f1f1-1f1f8",
      "keywords": [
        "旗",
        "LS",
        "旗: 莱索托"
      ]
    },
    {
      "unified": "1f1f1-1f1f9",
      "keywords": [
        "旗",
        "LT",
        "旗: 立陶宛"
      ]
    },
    {
      "unified": "1f1f1-1f1fa",
      "keywords": [
        "旗",
        "LU",
        "旗: 卢森堡"
      ]
    },
    {
      "unified": "1f1f1-1f1fb",
      "keywords": [
        "旗",
        "LV",
        "旗: 拉脱维亚"
      ]
    },
    {
      "unified": "1f1f1-1f1fe",
      "keywords": [
        "旗",
        "LY",
        "旗: 利比亚"
      ]
    },
    {
      "unified": "1f1f2-1f1e6",
      "keywords": [
        "旗",
        "MA",
        "旗: 摩洛哥"
      ]
    },
    {
      "unified": "1f1f2-1f1e8",
      "keywords": [
        "旗",
        "MC",
        "旗: 摩纳哥"
      ]
    },
    {
      "unified": "1f1f2-1f1e9",
      "keywords": [
        "旗",
        "MD",
        "旗: 摩尔多瓦"
      ]
    },
    {
      "unified": "1f1f2-1f1ea",
      "keywords": [
        "旗",
        "ME",
        "旗: 黑山"
      ]
    },
    {
      "unified": "1f1f2-1f1eb",
      "keywords": [
        "旗",
        "MF",
        "旗: 法属圣马丁"
      ]
    },
    {
      "unified": "1f1f2-1f1ec",
      "keywords": [
        "旗",
        "MG",
        "旗: 马达加斯加"
      ]
    },
    {
      "unified": "1f1f2-1f1ed",
      "keywords": [
        "旗",
        "MH",
        "旗: 马绍尔群岛"
      ]
    },
    {
      "unified": "1f1f2-1f1f0",
      "keywords": [
        "旗",
        "MK",
        "旗: 北马其顿"
      ]
    },
    {
      "unified": "1f1f2-1f1f1",
      "keywords": [
        "旗",
        "ML",
        "旗: 马里"
      ]
    },
    {
      "unified": "1f1f2-1f1f2",
      "keywords": [
        "旗",
        "MM",
        "旗: 缅甸"
      ]
    },
    {
      "unified": "1f1f2-1f1f3",
      "keywords": [
        "旗",
        "MN",
        "旗: 蒙古"
      ]
    },
    {
      "unified": "1f1f2-1f1f4",
      "keywords": [
        "旗",
        "MO",
        "旗: 中国澳门特别行政区"
      ]
    },
    {
      "unified": "1f1f2-1f1f5",
      "keywords": [
        "旗",
        "MP",
        "旗: 北马里亚纳群岛"
      ]
    },
    {
      "unified": "1f1f2-1f1f6",
      "keywords": [
        "旗",
        "MQ",
        "旗: 马提尼克"
      ]
    },
    {
      "unified": "1f1f2-1f1f7",
      "keywords": [
        "旗",
        "MR",
        "旗: 毛里塔尼亚"
      ]
    },
    {
      "unified": "1f1f2-1f1f8",
      "keywords": [
        "旗",
        "MS",
        "旗: 蒙特塞拉特"
      ]
    },
    {
      "unified": "1f1f2-1f1f9",
      "keywords": [
        "旗",
        "MT",
        "旗: 马耳他"
      ]
    },
    {
      "unified": "1f1f2-1f1fa",
      "keywords": [
        "旗",
        "MU",
        "旗: 毛里求斯"
      ]
    },
    {
      "unified": "1f1f2-1f1fb",
      "keywords": [
        "旗",
        "MV",
        "旗: 马尔代夫"
      ]
    },
    {
      "unified": "1f1f2-1f1fc",
      "keywords": [
        "旗",
        "MW",
        "旗: 马拉维"
      ]
    },
    {
      "unified": "1f1f2-1f1fd",
      "keywords": [
        "旗",
        "MX",
        "旗: 墨西哥"
      ]
    },
    {
      "unified": "1f1f2-1f1fe",
      "keywords": [
        "旗",
        "MY",
        "旗: 马来西亚"
      ]
    },
    {
      "unified": "1f1f2-1f1ff",
      "keywords": [
        "旗",
        "MZ",
        "旗: 莫桑比克"
      ]
    },
    {
      "unified": "1f1f3-1f1e6",
      "keywords": [
        "旗",
        "NA",
        "旗: 纳米比亚"
      ]
    },
    {
      "unified": "1f1f3-1f1e8",
      "keywords": [
        "旗",
        "NC",
        "旗: 新喀里多尼亚"
      ]
    },
    {
      "unified": "1f1f3-1f1ea",
      "keywords": [
        "旗",
        "NE",
        "旗: 尼日尔"
      ]
    },
    {
      "unified": "1f1f3-1f1eb",
      "keywords": [
        "旗",
        "NF",
        "旗: 诺福克岛"
      ]
    },
    {
      "unified": "1f1f3-1f1ec",
      "keywords": [
        "旗",
        "NG",
        "旗: 尼日利亚"
      ]
    },
    {
      "unified": "1f1f3-1f1ee",
      "keywords": [
        "旗",
        "NI",
        "旗: 尼加拉瓜"
      ]
    },
    {
      "unified": "1f1f3-1f1f1",
      "keywords": [
        "旗",
        "NL",
        "旗: 荷兰"
      ]
    },
    {
      "unified": "1f1f3-1f1f4",
      "keywords": [
        "旗",
        "NO",
        "旗: 挪威"
      ]
    },
    {
      "unified": "1f1f3-1f1f5",
      "keywords": [
        "旗",
        "NP",
        "旗: 尼泊尔"
      ]
    },
    {
      "unified": "1f1f3-1f1f7",
      "keywords": [
        "旗",
        "NR",
        "旗: 瑙鲁"
      ]
    },
    {
      "unified": "1f1f3-1f1fa",
      "keywords": [
        "旗",
        "NU",
        "旗: 纽埃"
      ]
    },
    {
      "unified": "1f1f3-1f1ff",
      "keywords": [
        "旗",
        "NZ",
        "旗: 新西兰"
      ]
    },
    {
      "unified": "1f1f4-1f1f2",
      "keywords": [
        "旗",
        "OM",
        "旗: 阿曼"
      ]
    },
    {
      "unified": "1f1f5-1f1e6",
      "keywords": [
        "旗",
        "PA",
        "旗: 巴拿马"
      ]
    },
    {
      "unified": "1f1f5-1f1ea",
      "keywords": [
        "旗",
        "PE",
        "旗: 秘鲁"
      ]
    },
    {
      "unified": "1f1f5-1f1eb",
      "keywords": [
        "旗",
        "PF",
        "旗: 法属波利尼西亚"
      ]
    },
    {
      "unified": "1f1f5-1f1ec",
      "keywords": [
        "旗",
        "PG",
        "旗: 巴布亚新几内亚"
      ]
    },
    {
      "unified": "1f1f5-1f1ed",
      "keywords": [
        "旗",
        "PH",
        "旗: 菲律宾"
      ]
    },
    {
      "unified": "1f1f5-1f1f0",
      "keywords": [
        "旗",
        "PK",
        "旗: 巴基斯坦"
      ]
    },
    {
      "unified": "1f1f5-1f1f1",
      "keywords": [
        "旗",
        "PL",
        "旗: 波兰"
      ]
    },
    {
      "unified": "1f1f5-1f1f2",
      "keywords": [
        "旗",
        "PM",
        "旗: 圣皮埃尔和密克隆群岛"
      ]
    },
    {
      "unified": "1f1f5-1f1f3",
      "keywords": [
        "旗",
        "PN",
        "旗: 皮特凯恩群岛"
      ]
    },
    {
      "unified": "1f1f5-1f1f7",
      "keywords": [
        "旗",
        "PR",
        "旗: 波多黎各"
      ]
    },
    {
      "unified": "1f1f5-1f1f8",
      "keywords": [
        "旗",
        "PS",
        "旗: 巴勒斯坦领土"
      ]
    },
    {
      "unified": "1f1f5-1f1f9",
      "keywords": [
        "旗",
        "PT",
        "旗: 葡萄牙"
      ]
    },
    {
      "unified": "1f1f5-1f1fc",
      "keywords": [
        "旗",
        "PW",
        "旗: 帕劳"
      ]
    },
    {
      "unified": "1f1f5-1f1fe",
      "keywords": [
        "旗",
        "PY",
        "旗: 巴拉圭"
      ]
    },
    {
      "unified": "1f1f6-1f1e6",
      "keywords": [
        "旗",
        "QA",
        "旗: 卡塔尔"
      ]
    },
    {
      "unified": "1f1f7-1f1ea",
      "keywords": [
        "旗",
        "RE",
        "旗: 留尼汪"
      ]
    },
    {
      "unified": "1f1f7-1f1f4",
      "keywords": [
        "旗",
        "RO",
        "旗: 罗马尼亚"
      ]
    },
    {
      "unified": "1f1f7-1f1f8",
      "keywords": [
        "旗",
        "RS",
        "旗: 塞尔维亚"
      ]
    },
    {
      "unified": "1f1f7-1f1fa",
      "keywords": [
        "旗",
        "RU",
        "旗: 俄罗斯"
      ]
    },
    {
      "unified": "1f1f7-1f1fc",
      "keywords": [
        "旗",
        "RW",
        "旗: 卢旺达"
      ]
    },
    {
      "unified": "1f1f8-1f1e6",
      "keywords": [
        "旗",
        "SA",
        "旗: 沙特阿拉伯"
      ]
    },
    {
      "unified": "1f1f8-1f1e7",
      "keywords": [
        "旗",
        "SB",
        "旗: 所罗门群岛"
      ]
    },
    {
      "unified": "1f1f8-1f1e8",
      "keywords": [
        "旗",
        "SC",
        "旗: 塞舌尔"
      ]
    },
    {
      "unified": "1f1f8-1f1e9",
      "keywords": [
        "旗",
        "SD",
        "旗: 苏丹"
      ]
    },
    {
      "unified": "1f1f8-1f1ea",
      "keywords": [
        "旗",
        "SE",
        "旗: 瑞典"
      ]
    },
    {
      "unified": "1f1f8-1f1ec",
      "keywords": [
        "旗",
        "SG",
        "旗: 新加坡"
      ]
    },
    {
      "unified": "1f1f8-1f1ed",
      "keywords": [
        "旗",
        "SH",
        "旗: 圣赫勒拿"
      ]
    },
    {
      "unified": "1f1f8-1f1ee",
      "keywords": [
        "旗",
        "SI",
        "旗: 斯洛文尼亚"
      ]
    },
    {
      "unified": "1f1f8-1f1ef",
      "keywords": [
        "旗",
        "SJ",
        "旗: 斯瓦尔巴和扬马延"
      ]
    },
    {
      "unified": "1f1f8-1f1f0",
      "keywords": [
        "旗",
        "SK",
        "旗: 斯洛伐克"
      ]
    },
    {
      "unified": "1f1f8-1f1f1",
      "keywords": [
        "旗",
        "SL",
        "旗: 塞拉利昂"
      ]
    },
    {
      "unified": "1f1f8-1f1f2",
      "keywords": [
        "旗",
        "SM",
        "旗: 圣马力诺"
      ]
    },
    {
      "unified": "1f1f8-1f1f3",
      "keywords": [
        "旗",
        "SN",
        "旗: 塞内加尔"
      ]
    },
    {
      "unified": "1f1f8-1f1f4",
      "keywords": [
        "旗",
        "SO",
        "旗: 索马里"
      ]
    },
    {
      "unified": "1f1f8-1f1f7",
      "keywords": [
        "旗",
        "SR",
        "旗: 苏里南"
      ]
    },
    {
      "unified": "1f1f8-1f1f8",
      "keywords": [
        "旗",
        "SS",
        "旗: 南苏丹"
      ]
    },
    {
      "unified": "1f1f8-1f1f9",
      "keywords": [
        "旗",
        "ST",
        "旗: 圣多美和普林西比"
      ]
    },
    {
      "unified": "1f1f8-1f1fb",
      "keywords": [
        "旗",
        "SV",
        "旗: 萨尔瓦多"
      ]
    },
    {
      "unified": "1f1f8-1f1fd",
      "keywords": [
        "旗",
        "SX",
        "旗: 荷属圣马丁"
      ]
    },
    {
      "unified": "1f1f8-1f1fe",
      "keywords": [
        "旗",
        "SY",
        "旗: 叙利亚"
      ]
    },
    {
      "unified": "1f1f8-1f1ff",
      "keywords": [
        "旗",
        "SZ",
        "旗: 斯威士兰"
      ]
    },
    {
      "unified": "1f1f9-1f1e6",
      "keywords": [
        "旗",
        "TA",
        "旗: 特里斯坦 达库尼亚群岛"
      ]
    },
    {
      "unified": "1f1f9-1f1e8",
      "keywords": [
        "旗",
        "TC",
        "旗: 特克斯和凯科斯群岛"
      ]
    },
    {
      "unified": "1f1f9-1f1e9",
      "keywords": [
        "旗",
        "TD",
        "旗: 乍得"
      ]
    },
    {
      "unified": "1f1f9-1f1eb",
      "keywords": [
        "旗",
        "TF",
        "旗: 法属南部领地"
      ]
    },
    {
      "unified": "1f1f9-1f1ec",
      "keywords": [
        "旗",
        "TG",
        "旗: 多哥"
      ]
    },
    {
      "unified": "1f1f9-1f1ed",
      "keywords": [
        "旗",
        "TH",
        "旗: 泰国"
      ]
    },
    {
      "unified": "1f1f9-1f1ef",
      "keywords": [
        "旗",
        "TJ",
        "旗: 塔吉克斯坦"
      ]
    },
    {
      "unified": "1f1f9-1f1f0",
      "keywords": [
        "旗",
        "TK",
        "旗: 托克劳"
      ]
    },
    {
      "unified": "1f1f9-1f1f1",
      "keywords": [
        "旗",
        "TL",
        "旗: 东帝汶"
      ]
    },
    {
      "unified": "1f1f9-1f1f2",
      "keywords": [
        "旗",
        "TM",
        "旗: 土库曼斯坦"
      ]
    },
    {
      "unified": "1f1f9-1f1f3",
      "keywords": [
        "旗",
        "TN",
        "旗: 突尼斯"
      ]
    },
    {
      "unified": "1f1f9-1f1f4",
      "keywords": [
        "旗",
        "TO",
        "旗: 汤加"
      ]
    },
    {
      "unified": "1f1f9-1f1f7",
      "keywords": [
        "旗",
        "TR",
        "旗: 土耳其"
      ]
    },
    {
      "unified": "1f1f9-1f1f9",
      "keywords": [
        "旗",
        "TT",
        "旗: 特立尼达和多巴哥"
      ]
    },
    {
      "unified": "1f1f9-1f1fb",
      "keywords": [
        "旗",
        "TV",
        "旗: 图瓦卢"
      ]
    },
    {
      "unified": "1f1f9-1f1fc",
      "keywords": [
        "旗",
        "TW",
        "旗: 台湾"
      ]
    },
    {
      "unified": "1f1f9-1f1ff",
      "keywords": [
        "旗",
        "TZ",
        "旗: 坦桑尼亚"
      ]
    },
    {
      "unified": "1f1fa-1f1e6",
      "keywords": [
        "旗",
        "UA",
        "旗: 乌克兰"
      ]
    },
    {
      "unified": "1f1fa-1f1ec",
      "keywords": [
        "旗",
        "UG",
        "旗: 乌干达"
      ]
    },
    {
      "unified": "1f1fa-1f1f2",
      "keywords": [
        "旗",
        "UM",
        "旗: 美国本土外小岛屿"
      ]
    },
    {
      "unified": "1f1fa-1f1f3",
      "keywords": [
        "旗",
        "UN",
        "旗: 联合国"
      ]
    },
    {
      "unified": "1f1fa-1f1f8",
      "keywords": [
        "旗",
        "US",
        "旗: 美国"
      ]
    },
    {
      "unified": "1f1fa-1f1fe",
      "keywords": [
        "旗",
        "UY",
        "旗: 乌拉圭"
      ]
    },
    {
      "unified": "1f1fa-1f1ff",
      "keywords": [
        "旗",
        "UZ",
        "旗: 乌兹别克斯坦"
      ]
    },
    {
      "unified": "1f1fb-1f1e6",
      "keywords": [
        "旗",
        "VA",
        "旗: 梵蒂冈"
      ]
    },
    {
      "unified": "1f1fb-1f1e8",
      "keywords": [
        "旗",
        "VC",
        "旗: 圣文森特和格林纳丁斯"
      ]
    },
    {
      "unified": "1f1fb-1f1ea",
      "keywords": [
        "旗",
        "VE",
        "旗: 委内瑞拉"
      ]
    },
    {
      "unified": "1f1fb-1f1ec",
      "keywords": [
        "旗",
        "VG",
        "旗: 英属维尔京群岛"
      ]
    },
    {
      "unified": "1f1fb-1f1ee",
      "keywords": [
        "旗",
        "VI",
        "旗: 美属维尔京群岛"
      ]
    },
    {
      "unified": "1f1fb-1f1f3",
      "keywords": [
        "旗",
        "VN",
        "旗: 越南"
      ]
    },
    {
      "unified": "1f1fb-1f1fa",
      "keywords": [
        "旗",
        "VU",
        "旗: 瓦努阿图"
      ]
    },
    {
      "unified": "1f1fc-1f1eb",
      "keywords": [
        "旗",
        "WF",
        "旗: 瓦利斯和富图纳"
      ]
    },
    {
      "unified": "1f1fc-1f1f8",
      "keywords": [
        "旗",
        "WS",
        "旗: 萨摩亚"
      ]
    },
    {
      "unified": "1f1fd-1f1f0",
      "keywords": [
        "旗",
        "XK",
        "旗: 科索沃"
      ]
    },
    {
      "unified": "1f1fe-1f1ea",
      "keywords": [
        "旗",
        "YE",
        "旗: 也门"
      ]
    },
    {
      "unified": "1f1fe-1f1f9",
      "keywords": [
        "旗",
        "YT",
        "旗: 马约特"
      ]
    },
    {
      "unified": "1f1ff-1f1e6",
      "keywords": [
        "旗",
        "ZA",
        "旗: 南非"
      ]
    },
    {
      "unified": "1f1ff-1f1f2",
      "keywords": [
        "旗",
        "ZM",
        "旗: 赞比亚"
      ]
    },
    {
      "unified": "1f1ff-1f1fc",
      "keywords": [
        "旗",
        "ZW",
        "旗: 津巴布韦"
      ]
    },
    {
      "unified": "1f3f4-e0067-e0062-e0065-e006e-e0067-e007f",
      "keywords": [
        "旗",
        "gbeng",
        "旗: 英格兰"
      ]
    },
    {
      "unified": "1f3f4-e0067-e0062-e0073-e0063-e0074-e007f",
      "keywords": [
        "旗",
        "gbsct",
        "旗: 苏格兰"
      ]
    },
    {
      "unified": "1f3f4-e0067-e0062-e0077-e006c-e0073-e007f",
      "keywords": [
        "旗",
        "gbwls",
        "旗: 威尔士"
      ]
    }
  ]
}
