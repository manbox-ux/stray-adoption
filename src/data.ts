/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pet } from './types';

export const PETS_DATA: Pet[] = [
  {
    id: 'dog_1',
    name: '麻糬 (Mochi)',
    type: 'dog',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=600'
    ],
    breed: '黃金獵犬 (Golden Retriever)',
    age: '1 歲 2 個月',
    gender: '男生',
    personality: ['超級活潑', '超級黏人', '聰明懂事', '愛玩球'],
    healthStatus: '已施打三劑疫苗、已完成絕育、晶片登記，健康狀態極佳，精力旺盛。',
    description: '麻糬是一個標準的陽光大男孩！對任何人與狗狗都超級友善，每次看到球球就會興奮地搖尾巴。他基本指令如「坐下」、「握手」都學會了，希望能找到一個有足夠空間、且熱愛戶外活動的家庭，陪他一起快樂奔跑成長。',
    vaccinated: true,
    spayed: true,
    postedDate: '2026-05-20',
    location: '台北市大安區'
  },
  {
    id: 'cat_1',
    name: '咪咪 (Mimi)',
    type: 'cat',
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=600'
    ],
    breed: '米克斯橘貓 (Mixed Ginger)',
    age: '8 個月',
    gender: '女生',
    personality: ['溫柔親人', '愛撒嬌', '貪吃鬼', '呼嚕機'],
    healthStatus: '已施打兩劑疫苗、已完成親人絕育與體內外驅蟲，血檢健康良好。',
    description: '咪咪是個小小撒嬌怪！只要你坐在沙發上，她就會立刻跳到你的大腿上，開始發出響亮的「呼嚕呼嚕」聲。她對食物極度狂熱，非常適合用小點心來跟她培養感情。希望能找到一個細心呵護她的溫馨家庭，讓她一輩子都在呼嚕中度過。',
    vaccinated: true,
    spayed: true,
    postedDate: '2026-05-22',
    location: '新北市板橋區'
  },
  {
    id: 'dog_2',
    name: '波比 (Bobby)',
    type: 'dog',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1612536057832-2ff7eed58194?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=600'
    ],
    breed: '溫馨柯基犬 (Corgi)',
    age: '2 歲',
    gender: '男生',
    personality: ['穩重乖巧', '貼心小棉襖', '親人友善', '短腿萌'],
    healthStatus: '年度疫苗已完成、已絕育、有輕微關節保養需求（目前每日食用保養品即可）。',
    description: '波比擁有迷人的電臀和滿分的笑容！他性情隨和，不像一般幼犬那般毛躁，非常懂得觀察主人的情緒。在客廳時會安靜地窩在你腳邊，出門時也走得很好不會暴衝。希望新主人能注意他的體重管理，保護他的小短腿唷！',
    vaccinated: true,
    spayed: true,
    postedDate: '2026-05-18',
    location: '台中市西區'
  },
  {
    id: 'cat_2',
    name: '雪球 (Snowball)',
    type: 'cat',
    images: [
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=600'
    ],
    breed: '波斯混血白貓 (Persian Mix)',
    age: '3 歲',
    gender: '女生',
    personality: ['高雅安靜', '慢熟害羞', '愛乾淨', '日光浴愛好者'],
    healthStatus: '貓愛滋/白血檢驗皆呈陰性。定期除蟲。已絕育。輕微乾眼，需定期點人工淚液。',
    description: '雪球是一隻安靜高雅的氣質熟女。剛到新環境時會比較膽小，需要一到兩週來建立信任感。一旦她認可你，就會用額頭輕輕蹭你示好。她最喜歡坐在窗邊曬太陽，觀察外面的小鳥。需要有耐心、且居家環境純靜的家庭生活。',
    vaccinated: true,
    spayed: true,
    postedDate: '2026-05-25',
    location: '高雄市左營區'
  },
  {
    id: 'dog_3',
    name: '可可 (Coco)',
    type: 'dog',
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=600'
    ],
    breed: '黑白色喜樂蒂 (Sheltie Mix)',
    age: '6 個月',
    gender: '女生',
    personality: ['溫順膽小', '好奇心旺盛', '愛乾淨', '學習力極強'],
    healthStatus: '基本驅蟲與前兩劑疫苗已完成，預計下個月可進行絕育手術（合約備註）。',
    description: '可可剛從山區被救回來，雖然有點怕大聲響，但對人類充滿了好奇與愛意。她非常聰明，觀察力驚人，教一次「去尿布墊上廁所」就學會了大半。她需要一個充滿愛與耐心的家庭引導，幫助她探索這個美麗的世界。',
    vaccinated: false,
    spayed: false,
    postedDate: '2026-05-26',
    location: '新竹市東區'
  },
  {
    id: 'cat_3',
    name: '歐利奧 (Oreo)',
    type: 'cat',
    images: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&q=80&w=600'
    ],
    breed: '經典賓士貓 (Tuxedo Cat)',
    age: '1 歲 5 個月',
    gender: '男生',
    personality: ['超級愛講話', '搞笑調皮', '親貓親人', '好奇寶寶'],
    healthStatus: '體檢全項正常，已施打年度綜合疫苗、已完成三合一快篩皆陰性、已絕育。',
    description: '歐利奧是貓界的默劇大師與話癆！他每天都會跟你用各種尾音的「喵喵」對話。熱愛跳來跳去，追逐紅點和逗貓棒是他人生最大的樂趣。他也非常親其他貓咪，非常適合家裡已經有貓貓、想找個伴的家庭！',
    vaccinated: true,
    spayed: true,
    postedDate: '2026-05-24',
    location: '台南市中西區'
  },
  {
    id: 'dog_4',
    name: '黑豆 (Kuro)',
    type: 'dog',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600'
    ],
    breed: '熱情柴犬混血 (Shiba Mix)',
    age: '1 歲',
    gender: '男生',
    personality: ['熱情洋溢', '憨厚老實', '愛撒嬌', '親狗親人'],
    healthStatus: '已完成絕育、晶片登記與全套疫苗。健康、無任何遺傳病史。',
    description: '黑豆有著一身亮麗微捲的黑亮短毛，笑起來時眼睛會瞇成兩條線！他天生脾氣非常好，即使被別的小狗吠叫也是樂天派地搖頭晃腦。平常喜歡啃潔牙骨和看著窗外。他是一位完美的心靈陪伴犬！',
    vaccinated: true,
    spayed: true,
    postedDate: '2026-05-15',
    location: '花蓮縣花蓮市'
  },
  {
    id: 'cat_4',
    name: '虎妞 (Tiger)',
    type: 'cat',
    images: [
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600'
    ],
    breed: '豹紋美短混血 (Tabby Mix)',
    age: '2 歲 3 個月',
    gender: '女生',
    personality: ['親人乖巧', '獨立自主', '捕獵高手', '呼嚕狂人'],
    healthStatus: '已完成絕育、狂犬病自費疫苗、三合一血檢正常、定期滴全能貓除蟲。',
    description: '虎妞有一對炯炯有神的大黃眼睛和極為對稱的虎斑條紋。她是一隻非常獨立省心的母貓，不吵不鬧，當你在忙時她會找一個舒服的地方睡覺不打擾你；但當你閒下來時，她會慢悠悠地走過來要求摸摸，是一隻懂得以禮相待的成熟小可愛。',
    vaccinated: true,
    spayed: true,
    postedDate: '2026-05-19',
    location: '台北市信義區'
  }
];

export const FAQS = [
  {
    q: '認養需要費用嗎？',
    a: '我們平台倡導「以認養代替購買」，認養動物本身不收取任何購買費用。然而，部分合作收容所或中途之家可能會酌收基本醫療費用（如：絕育費用、狂犬病疫苗、晶片登記工本費等，均會出示收據憑證大約在 $500~$1500 之間），此費用皆直接全數回饋在動物醫療上。'
  },
  {
    q: '認養流程有哪些步驟呢？',
    a: '流程大致為：1. 線上提出認養意願書 -> 2. 人員初步信件/電話聯絡與觀念協調 -> 3. 親自前往現場與毛孩進行面對面互動（多次互動佳） -> 4. 居家環境安全評估與準備（如窗網、防護欄安裝） -> 5. 簽署認養協議書與辦理晶片轉移，正式帶回家！'
  },
  {
    q: '租屋處可以認養毛孩嗎？',
    a: '租屋家庭是可以認養的，但必須遵守以下兩點：(1) 必須提供房東同意飼養寵物的書面條款或合約證明，避免未來發生因租約糾紛而棄養的事情。(2) 居住環境的窗戶與陽台需有妥善的隱形紗窗或防護網護欄，確保毛孩安全。'
  },
  {
    q: '我是新手，沒有養過寵物也可以認養嗎？',
    a: '當然可以！每個人都是從零開始。我們的工作人員和志工會提供完整的日常照護、飲食、以及居家安全防護諮詢輔導。在正式帶回家後，我們也會建立聯絡群組，隨時解答您在新手期遇到的任何毛孩教養與健康疑惑。'
  }
];

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  line: 'https://line.me',
  phone: '02-2345-6789',
  email: 'service@furryhome-adopt.org',
  address: '台北市大安區溫暖路 101 號 (萌寵尋家推廣中心)',
  hours: '週二至週日 10:00 - 18:00 (週一公休，敬請預約參觀)'
};
