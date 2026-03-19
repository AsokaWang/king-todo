// 使用 fetch API 创建测试数据
async function seedData() {
  const baseUrl = 'http://localhost:3000';

  // 创建清单
  const lists = [
    { name: '工作', emoji: '📁', color: '#e06d5d' },
    { name: '生活', emoji: '📁', color: '#5fa38c' },
    { name: '你好', emoji: '☰', color: '#9b84e8' },
  ];

  for (const list of lists) {
    try {
      const response = await fetch(`${baseUrl}/api/lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(list)
      });
      const data = await response.json();
      console.log(`Created list ${list.name}:`, data.ok ? 'success' : 'failed');
    } catch (e) {
      console.error(`Failed to create ${list.name}:`, e.message);
    }
  }

  console.log('Seed completed!');
}

seedData();
