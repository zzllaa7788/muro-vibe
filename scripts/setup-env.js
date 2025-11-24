#!/usr/bin/env node

/**
 * Netlify 환경 변수 자동 설정 스크립트
 * 로컬 .env 파일을 읽어서 Netlify에 자동으로 환경 변수를 설정합니다.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🐶 멍멍! 환경 변수 설정을 시작한다개!\n');

// .env 파일 읽기
const envPath = path.join(__dirname, '..', '.env');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env 파일이 없다개! 먼저 .env 파일을 만들어달라개!');
  console.log('\n💡 .env.example을 복사해서 .env 파일을 만들고 API 키를 입력하세요:');
  console.log('   cp .env.example .env\n');
  process.exit(1);
}

// .env 파일 파싱
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  // 주석이나 빈 줄 무시
  if (line.trim() === '' || line.trim().startsWith('#')) {
    return;
  }
  
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    const value = valueParts.join('=').trim();
    envVars[key.trim()] = value;
  }
});

// 환경 변수가 있는지 확인
if (Object.keys(envVars).length === 0) {
  console.error('❌ .env 파일에 환경 변수가 없다개!');
  console.log('\n💡 .env 파일을 열고 VITE_GEMINI_API_KEY를 설정하세요.\n');
  process.exit(1);
}

console.log('📋 설정할 환경 변수:');
Object.keys(envVars).forEach(key => {
  const maskedValue = envVars[key].substring(0, 10) + '...';
  console.log(`   ${key} = ${maskedValue}`);
});
console.log('');

// Netlify CLI가 설치되어 있는지 확인
try {
  execSync('npx netlify --version', { stdio: 'pipe' });
} catch (error) {
  console.error('❌ Netlify CLI가 설치되지 않았다개!');
  console.log('\n💡 다음 명령어로 설치하세요:');
  console.log('   npm install -D netlify-cli\n');
  process.exit(1);
}

// Netlify 로그인 확인
console.log('🔐 Netlify 인증 확인 중...');
try {
  execSync('npx netlify status', { stdio: 'pipe' });
  console.log('✅ Netlify 인증 완료!\n');
} catch (error) {
  console.log('⚠️  Netlify에 로그인이 필요하다개!');
  console.log('🌐 브라우저가 열릴 거예요. 로그인해주세요!\n');
  
  try {
    execSync('npx netlify login', { stdio: 'inherit' });
  } catch (loginError) {
    console.error('\n❌ Netlify 로그인에 실패했다개!');
    process.exit(1);
  }
}

// 환경 변수 설정
console.log('🚀 Netlify 환경 변수 설정 중...\n');

let successCount = 0;
let errorCount = 0;

Object.entries(envVars).forEach(([key, value]) => {
  try {
    console.log(`   ⏳ ${key} 설정 중...`);
    execSync(`npx netlify env:set ${key} "${value}" --context production`, { 
      stdio: 'pipe' 
    });
    console.log(`   ✅ ${key} 설정 완료!`);
    successCount++;
  } catch (error) {
    console.error(`   ❌ ${key} 설정 실패!`);
    errorCount++;
  }
});

console.log('\n' + '='.repeat(50));
if (errorCount === 0) {
  console.log('🎉 멍멍! 모든 환경 변수 설정이 완료되었다개!');
  console.log(`✅ 성공: ${successCount}개`);
  console.log('\n💡 다음 단계:');
  console.log('   1. npm run deploy 실행');
  console.log('   2. 배포 완료 후 사이트 테스트\n');
} else {
  console.log('⚠️  일부 환경 변수 설정에 실패했다개!');
  console.log(`✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${errorCount}개`);
  console.log('\n💡 Netlify 대시보드에서 수동으로 설정해야 할 수도 있다개!\n');
}

