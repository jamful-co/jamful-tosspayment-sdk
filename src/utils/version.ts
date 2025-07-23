// package.json 파일을 읽어와서 JSON 파싱
import packageJson from '../../package.json';

const packageVersion = packageJson.version;

export const Version = packageVersion;
