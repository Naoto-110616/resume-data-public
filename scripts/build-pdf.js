/**
 * PDF ビルドスクリプト
 *
 * - .env と環境変数から個人情報を読み込む
 * - documents/*.md を読み、{{TOKEN}} を差し替えた一時ファイルを作る
 * - md-to-pdf で PDF を生成し、exports/{owner}_{YYYYMMDD}.pdf に保存
 * - 一時ファイルは documents/ 配下に作るので、Markdown 内の相対パス（../sample/...）はそのまま動く
 *
 * 使い方:
 *   node scripts/build-pdf.js            # 全部
 *   node scripts/build-pdf.js resume     # 履歴書のみ
 *   node scripts/build-pdf.js career     # 職務経歴書のみ
 */

const fs = require("fs");
const path = require("path");
const { mdToPdf } = require("md-to-pdf");

const ROOT = path.resolve(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".env");

loadDotEnv(ENV_PATH);

const TARGETS = {
	resume: {
		src: "documents/履歴書.md",
		stylesheet: "styles/resume.css",
		docType: "履歴書",
		pdf_options: { format: "A3", landscape: true, margin: "10mm" },
	},
	career: {
		src: "documents/職務経歴書.md",
		stylesheet: "styles/career.css",
		docType: "職務経歴書",
		pdf_options: { format: "A4", margin: "15mm" },
	},
};

const PROFILE = buildProfile();

function loadDotEnv(envPath) {
	if (!fs.existsSync(envPath)) return;

	const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;

		const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
		if (!match) continue;

		const [, key, rawValue] = match;
		if (process.env[key] !== undefined) continue;

		process.env[key] = parseEnvValue(rawValue);
	}
}

function parseEnvValue(value) {
	const trimmed = value.trim();
	const quote = trimmed[0];
	if (
		(quote === '"' || quote === "'") &&
		trimmed[trimmed.length - 1] === quote
	) {
		return trimmed.slice(1, -1);
	}

	return trimmed;
}

function env(name, fallback = "") {
	return process.env[name] ?? fallback;
}

function envBool(name, fallback = false) {
	const value = env(name, String(fallback)).trim().toLowerCase();
	return ["1", "true", "yes", "on"].includes(value);
}

function buildProfile() {
	const birthDate = parseBirthDate(env("BIRTH_DATE", "2000-01-01"));
	const ownerName = env("OWNER_NAME", "山田 太郎");
	const showContact = envBool("SHOW_CONTACT", false);

	return {
		OWNER_NAME: ownerName,
		OWNER_FURIGANA: env("OWNER_FURIGANA", "やまだ　たろう"),
		OWNER_FILENAME: env("OWNER_FILENAME", ownerName.replace(/\s+/g, "")),
		BIRTH_DATE: birthDate,
		BIRTH_YEAR: String(birthDate.year),
		BIRTH_MONTH: String(birthDate.month),
		BIRTH_DAY: String(birthDate.day),
		GENDER: env("GENDER", ""),
		ADDRESS_FURIGANA: env("ADDRESS_FURIGANA", ""),
		POSTAL_CODE: env("POSTAL_CODE", "000-0000"),
		ADDRESS: env("ADDRESS", "東京都千代田区丸の内1-1-1"),
		PHONE: env("PHONE", "000-0000-0000"),
		SHOW_CONTACT: String(showContact),
		CONTACT_FURIGANA: env("CONTACT_FURIGANA", ""),
		CONTACT_POSTAL_CODE: env("CONTACT_POSTAL_CODE", ""),
		CONTACT_ADDRESS: env("CONTACT_ADDRESS", ""),
		CONTACT_PHONE: env("CONTACT_PHONE", ""),
		CONTACT_FURIGANA_DISPLAY: showContact ? env("CONTACT_FURIGANA", "") : "",
		CONTACT_POSTAL_CODE_DISPLAY: showContact
			? env("CONTACT_POSTAL_CODE", "")
			: "",
		CONTACT_ADDRESS_DISPLAY: showContact ? env("CONTACT_ADDRESS", "") : "",
		CONTACT_PHONE_DISPLAY: showContact ? env("CONTACT_PHONE", "") : "",
		EMAIL: env("EMAIL", "example@example.com"),
		GITHUB_URL: env("GITHUB_URL", "https://github.com/example"),
		PORTFOLIO_URL: env("PORTFOLIO_URL", "https://example.com"),
		PHOTO_PATH: env("PHOTO_PATH", ""),
		HIGH_SCHOOL_NAME: env("HIGH_SCHOOL_NAME", "サンプル高等学校"),
		VOCATIONAL_SCHOOL_NAME: env("VOCATIONAL_SCHOOL_NAME", "サンプル専門学校"),
		COMPANY_ADLINE: env("COMPANY_ADLINE", "株式会社サンプルA"),
		COMPANY_IDEAIMAGE: env("COMPANY_IDEAIMAGE", "株式会社サンプルB"),
		COMPANY_80: env("COMPANY_80", "株式会社サンプルC"),
		COMPANY_ATOMS: env("COMPANY_ATOMS", "株式会社サンプルD"),
		CLIENT_KOSE: env("CLIENT_KOSE", "株式会社クライアントA"),
		CLIENT_LEO_SOPHIA: env("CLIENT_LEO_SOPHIA", "株式会社クライアントB"),
		CLIENT_GASENDO: env("CLIENT_GASENDO", "有限会社クライアントC"),
		CLIENT_AEON: env("CLIENT_AEON", "株式会社クライアントD"),
		CLIENT_KYOTO_SHIMBUN: env("CLIENT_KYOTO_SHIMBUN", "株式会社クライアントE"),
	};
}

function parseBirthDate(value) {
	const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
	if (!match) {
		throw new Error("BIRTH_DATE must be formatted as YYYY-MM-DD");
	}

	return {
		year: Number(match[1]),
		month: Number(match[2]),
		day: Number(match[3]),
	};
}

function loadPhotoDataUri(photoPath) {
	if (!photoPath) return createPhotoPlaceholderDataUri();

	const abs = path.resolve(ROOT, photoPath);
	if (!fs.existsSync(abs)) return createPhotoPlaceholderDataUri();

	const ext = path.extname(abs).toLowerCase().replace(".", "");
	const mime =
		ext === "jpg" || ext === "jpeg"
			? "image/jpeg"
			: ext === "png"
				? "image/png"
				: ext === "webp"
					? "image/webp"
					: "application/octet-stream";
	const base64 = fs.readFileSync(abs).toString("base64");
	return `data:${mime};base64,${base64}`;
}

function createPhotoPlaceholderDataUri() {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="354" height="472" viewBox="0 0 354 472"><rect width="354" height="472" fill="#f5f5f5"/><rect x="1" y="1" width="352" height="470" fill="none" stroke="#999" stroke-width="2"/><text x="177" y="236" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="40" fill="#777">PHOTO</text></svg>`;
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function formatToday(d) {
	const yyyy = d.getFullYear();
	const m = d.getMonth() + 1;
	const day = d.getDate();
	return {
		display: `${yyyy}年${m}月${day}日`, // 文書内に差し込む表示用
		fileTag: `${yyyy}${String(m).padStart(2, "0")}${String(day).padStart(2, "0")}`, // ファイル名用
		age: calculateAge(d, PROFILE.BIRTH_DATE),
	};
}

function calculateAge(asOf, birthDate) {
	let age = asOf.getFullYear() - birthDate.year;
	const birthdayThisYear = new Date(
		asOf.getFullYear(),
		birthDate.month - 1,
		birthDate.day
	);
	if (asOf < birthdayThisYear) age -= 1;
	return age;
}

async function buildOne(key, today) {
	const t = TARGETS[key];
	if (!t) throw new Error(`unknown target: ${key}`);

	const srcAbs = path.join(ROOT, t.src);
	const styleAbs = path.join(ROOT, t.stylesheet);
	const exportsDir = path.join(ROOT, "exports");
	const outAbs = path.join(
		exportsDir,
		`${PROFILE.OWNER_FILENAME}_${today.fileTag}_${t.docType}.pdf`
	);

	if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir, { recursive: true });

	const raw = fs.readFileSync(srcAbs, "utf8");
	const rendered = applyTokens(raw, {
		...PROFILE,
		TODAY: today.display,
		AGE: String(today.age),
		PHOTO: loadPhotoDataUri(PROFILE.PHOTO_PATH),
	});

	// 一時ファイルを documents/ 直下に置く（相対パス解決のため）
	const tmpAbs = path.join(
		path.dirname(srcAbs),
		`.build_${path.basename(srcAbs)}`
	);
	fs.writeFileSync(tmpAbs, rendered);

	try {
		await mdToPdf(
			{ path: tmpAbs },
			{
				stylesheet: [styleAbs],
				dest: outAbs,
				pdf_options: t.pdf_options,
			}
		);
		console.log(`✓ ${path.relative(ROOT, outAbs)}`);
	} finally {
		fs.unlinkSync(tmpAbs);
	}
}

function applyTokens(raw, values) {
	return raw.replace(/\{\{\s*([A-Z0-9_]+)\s*\}\}/g, (match, key) => {
		if (values[key] !== undefined) return String(values[key]);
		return match;
	});
}

(async () => {
	const arg = process.argv[2];
	const today = formatToday(new Date());
	const keys = arg ? [arg] : Object.keys(TARGETS);

	for (const k of keys) {
		await buildOne(k, today);
	}
})().catch((e) => {
	console.error(e);
	process.exit(1);
});
