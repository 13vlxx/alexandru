const ja = {
	nav: {
		about: "概要",
		projects: "プロジェクト",
		services: "サービス",
		contact: "お問い合わせ",
		language: "言語を選択",
		skip: "本文へスキップ",
	},
	not_found: {
		title: "ページが見つかりません。",
		cta: "ホームに戻る",
	},
	hero: {
		subtitle: "ソフトウェアアーキテクト & デベロッパー",
		description:
			"スケーラブルなシステムと丁寧なソフトウェアを作る — アーキテクチャから本番環境まで。",
		cta_work: "作品を見る",
		cta_contact: "お問い合わせ",
	},
	about: {
		section_label: "01 / 私について",
		heading_1: "ソフトウェア",
		heading_2: "設計者。",
		profile_label: "プロフィール",
		profile_bio_1:
			"スケーラブルで保守性の高いシステムを構築するソフトウェアアーキテクト。データベース設計からUIまで — 常に明瞭さと品質にこだわる。",
		profile_bio_2: "速さより、丁寧さを大切にする。",
		expertise_label: "専門領域",
		expertise: [
			"システムアーキテクチャ",
			"API & バックエンド設計",
			"フロントエンド開発",
			"チームリーダーシップ",
			"パフォーマンス最適化",
		],
		connect_label: "連絡先",
		currently_label: "現在",
		currently_text:
			"ソフトウェアアーキテクチャの修士課程を修了間近。Neovimを学びながら、新しいプロジェクトを探しています。",
	},
	projects: {
		section_label: "02 / プロジェクト",
		heading_1: "厳選した",
		heading_2: "作品。",
		visit: "サイトを見る",
		internal: "社内ツール",
		pagination: "プロジェクトを選択",
		items: {
			oreus: {
				role: "バックエンド開発者",
				description:
					"インテリジェントなワークフローを自動化・スケールするAI搭載プラットフォーム。コア製品を支えるバックエンドインフラ、API、データパイプラインを設計・運用。",
			},
			raissa: {
				role: "フルスタック",
				description:
					"マリニャーヌの美容サロンの紹介サイト — タブ式の施術メニュー、お客様の声、Planityでの予約に対応し、PWAとしてインストール可能。ブランドの世界観を映す白と金のエディトリアルなデザイン。",
			},
			airbus: {
				role: "フルスタック",
				description:
					"エンジン部品サンプルを分析するエアバス社内ツール。手作業プロセスを構造化されたデータパイプラインとレポートインターフェースに置き換え、検査ワークフローをデジタル化。",
			},
			monaco: {
				role: "フルスタック",
				description:
					"マリニャーヌの美容サロンのウェブサイト — 予約システム、サービス紹介、管理パネル。ブランドのハイエンドなポジショニングに合わせた洗練されたUIを設計。",
			},
		},
	},
	services: {
		section_label: "03 / サービス",
		heading_1: "私が",
		heading_2: "作るもの。",
		items: {
			frontend: {
				title: "フロントエンド",
				subtitle: "開発",
				description:
					"ReactとTypeScriptで構築するピクセルパーフェクトなUI。ユーザーが実感できるデザインシステム、アニメーション、パフォーマンス最適化。",
			},
			backend: {
				title: "バックエンド",
				subtitle: "& API",
				description:
					"REST & GraphQL API、イベント駆動アーキテクチャ、マイクロサービス。クリーンでテスト済み、スケール対応。",
			},
			mobile: {
				title: "モバイル",
				subtitle: "アプリ",
				description:
					"ネイティブな使い心地のiOS & Androidアプリ。既存のAPIとシームレスに統合。",
			},
			infra: {
				title: "インフラ",
				subtitle: "& Kubernetes",
				description:
					"サーバー設定、Kubernetesクラスター、ネットワーク、セキュリティ。Infrastructure as Codeで完全再現可能な環境を実現。",
			},
			deployment: {
				title: "デプロイ",
				subtitle: "& CI/CD",
				description:
					"エンドツーエンドのパイプライン、モニタリング、リリース管理。コミットから本番環境まで自信を持って。",
			},
		},
	},
	footer: {
		available: "新規プロジェクト受付中",
		heading_1: "共に",
		heading_2: "作りましょう。",
		rights: "全著作権所有",
	},
} as const;

export default ja;
