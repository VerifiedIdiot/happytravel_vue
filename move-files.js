const fs = require('fs-extra');
const path = require('path');

// 빌드된 파일이 있는 디렉토리
const buildDir = path.resolve(__dirname, '../happytravel_spring/src/main/resources/static');
// 이동할 대상 디렉토리
const targetDir = path.resolve(__dirname, '../happytravel_spring/src/main/webapp');

// 대상 디렉토리가 없으면 생성
fs.ensureDirSync(targetDir);

// 빌드된 파일을 대상 디렉토리로 복사
fs.copy(buildDir, targetDir, { overwrite: true }, (err) => {
  if (err) {
    console.error('Error moving files:', err);
  } else {
    console.log('Files moved successfully!');
  }

  // Optional: 원래 빌드 디렉토리 삭제 (필요한 경우)
  fs.removeSync(buildDir);

  // WEB-INF 디렉토리 보호: WEB-INF 디렉토리가 있으면 다시 복사
  //   const webInfDir = path.resolve(__dirname, '../happytravel_spring/src/main/webapp/WEB-INF');
  //   if (fs.existsSync(webInfDir)) {
  //     fs.copy(webInfDir, path.resolve(__dirname, '../happytravel_spring/src/main/webapp/WEB-INF_backup'), { overwrite: true }, (backupErr) => {
  //       if (backupErr) {
  //         console.error('Error backing up WEB-INF:', backupErr);
  //       } else {
  //         console.log('WEB-INF backed up successfully!');
  //       }
  //     });
  //   }
});
