<div class="resume-header">
  <h1 class="resume-title">履　歴　書</h1>
  <div class="resume-date">{{TODAY}}現在</div>
</div>

<div class="resume-grid">

<!-- ============================== 左カラム ============================== -->
<section class="col-left">

<table class="profile-table">
  <tr>
    <td colspan="2" class="furigana-cell">ふりがな　　{{OWNER_FURIGANA}}</td>
    <td rowspan="3" class="photo-cell">
      <img class="photo-img" src="{{PHOTO}}" alt="本人写真">
    </td>
  </tr>
  <tr>
    <td colspan="2" class="name-cell">
      <span class="cell-label">氏　名</span>
      <span class="name">{{OWNER_NAME}}</span>
    </td>
  </tr>
  <tr>
    <td class="birth-cell">{{BIRTH_YEAR}} 年　{{BIRTH_MONTH}} 月　{{BIRTH_DAY}} 日生　（満　{{AGE}}　歳）</td>
    <td class="gender-cell"><span class="gender-mark">※性別</span>　{{GENDER}}</td>
  </tr>
  <tr>
    <td colspan="2" class="address-cell">
      <div class="furigana">ふりがな　{{ADDRESS_FURIGANA}}</div>
      現住所　〒{{POSTAL_CODE}}<br>
      {{ADDRESS}}
    </td>
    <td class="tel-cell">
      <div class="tel-label">電話</div>
      {{PHONE}}
    </td>
  </tr>
  <tr>
    <td colspan="2" class="contact-cell">
      <div class="furigana">ふりがな　{{CONTACT_FURIGANA_DISPLAY}}</div>
      連絡先　〒{{CONTACT_POSTAL_CODE_DISPLAY}}　{{CONTACT_ADDRESS_DISPLAY}}<span class="contact-note">（現住所以外に連絡を希望する場合のみ記入）</span>
    </td>
    <td class="tel-cell">
      <div class="tel-label">電話</div>{{CONTACT_PHONE_DISPLAY}}
    </td>
  </tr>
</table>

<table class="history-table">
  <thead>
    <tr>
      <th class="col-year">年</th>
      <th class="col-month">月</th>
      <th>学　歴・職　歴（各別にまとめて書く）</th>
    </tr>
  </thead>
  <tbody>
    <tr class="section-row"><td colspan="3">学歴</td></tr>
    <tr><td>2018</td><td>3</td><td>{{HIGH_SCHOOL_NAME}}　卒業</td></tr>
    <tr><td>2018</td><td>4</td><td>{{VOCATIONAL_SCHOOL_NAME}}　TV制作コース　入学</td></tr>
    <tr><td>2020</td><td>3</td><td>{{VOCATIONAL_SCHOOL_NAME}}　TV制作コース　卒業</td></tr>
    <tr class="empty-row"><td></td><td></td><td></td></tr>
    <tr class="section-row"><td colspan="3">職歴</td></tr>
    <tr><td>2020</td><td>7</td><td>{{COMPANY_ADLINE}}　入社</td></tr>
    <tr><td>2020</td><td>12</td><td>{{COMPANY_ADLINE}}　退職</td></tr>
    <tr><td>2021</td><td>5</td><td>{{COMPANY_IDEAIMAGE}}　入社（パート・アルバイト）</td></tr>
    <tr><td>2022</td><td>3</td><td>{{COMPANY_IDEAIMAGE}}　退職</td></tr>
    <tr><td>2022</td><td>5</td><td>{{COMPANY_80}}　入社</td></tr>
    <tr><td>2026</td><td>3</td><td>{{COMPANY_80}}　会社都合により退職</td></tr>
    <tr><td>2026</td><td>4</td><td>{{COMPANY_ATOMS}}　入社</td></tr>
    <tr class="end-row"><td></td><td></td><td>現在に至る　　　　　　　　　　　　以上</td></tr>
  </tbody>
</table>

</section>

<!-- ============================== 右カラム ============================== -->
<section class="col-right">

<table class="history-table">
  <thead>
    <tr>
      <th class="col-year">年</th>
      <th class="col-month">月</th>
      <th>学　歴・職　歴（各別にまとめて書く）</th>
    </tr>
  </thead>
  <tbody>
    <tr class="empty-row"><td></td><td></td><td></td></tr>
    <tr class="empty-row"><td></td><td></td><td></td></tr>
    <tr class="empty-row"><td></td><td></td><td></td></tr>
    <tr class="empty-row"><td></td><td></td><td></td></tr>
  </tbody>
</table>

<table class="history-table">
  <thead>
    <tr>
      <th class="col-year">年</th>
      <th class="col-month">月</th>
      <th>免　許・資　格</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>2018</td><td></td><td>普通自動車第一種運転免許　取得</td></tr>
    <tr class="empty-row"><td></td><td></td><td></td></tr>
    <tr class="empty-row"><td></td><td></td><td></td></tr>
    <tr class="empty-row"><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="boxed boxed--motivation">
  <div class="box-label">志望の動機、特技、好きな学科、アピールポイントなど</div>
  <div class="box-content">■ デザインから実装までの一貫対応力
Figma によるデザインから Next.js での実装、Vercel への本番デプロイまでを独力で完結できることが強みです。自社コーポレートサイトおよび個人ポートフォリオサイト（naoto-okawa.com）では、UI 設計・Contentful による CMS 連携・Resend を用いたお問い合わせ実装まで一貫して担当しました。プロジェクトでは XD から Figma への移行を提案・主導し、デザイナーとエンジニアの認識差を埋める運用フローを整備した経験もあります。デザインとエンジニアリングを横断して捉えられることが、UI / UX の品質向上に直結すると考えています。

■ プロセス改善とコンポーネント設計
開発プロセスの改善とコンポーネント設計に継続的に取り組んできました。イオンリテール社のEC案件では、Figma と GitHub Issue を連携させて開発状況を可視化し、1ページあたりの実装時間を1日から半日へ短縮しました。また、ロジック層と UI 層を明確に分けたディレクトリ構造を採用し、色やアニメーションの duration・opacity などを共通化、Storybook によるコンポーネントの可視化も推進し、仕様変更に強く統一感のある実装を実現しています。再利用性と継続開発のしやすさを意識した設計が得意です。

■ マネジメントとチーム横断のコミュニケーション
4名（30代メンバー2名・オフショアメンバー2名）のマネジメント経験があり、デイリースクラムのファシリテーションやタスク管理・スケジュール調整を担当してきました。海外メンバーとの時差を考慮したタスク分配や、部署間で責任範囲が不明確な場面で密なコミュニケーションを取り認識を揃えるなど、チーム全体が機能しやすい状態を作ることを意識しています。デザイン・ビジネス・エンジニアの各チームと密にやり取りしながら開発を進めることが得意で、フルリモート環境でもチームをサポートしながら自走できることが強みです。</div>
</div>

<div class="boxed boxed--wishes">
  <div class="box-label">本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）</div>
  <div class="box-content">メールアドレス：{{EMAIL}}
GitHub：{{GITHUB_URL}}
Portfolio：{{PORTFOLIO_URL}}</div>
</div>

</section>

</div>
