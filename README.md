# Deploy to Vercel

This repository is a static landing page. Use the Vercel CLI to deploy it quickly.

Steps:

1. Install Vercel CLI (if not already):

```bash
npm i -g vercel
```

2. Log in and deploy (one-time interactive login):

```bash
vercel login
vercel --prod
```

Or use the npm script:

```bash
npm run deploy
```

Notes:

- The site is configured as a static project in `vercel.json`.
- If you want CI/CD from GitHub/GitLab/Bitbucket, connect this repository in the Vercel dashboard.

## Automated deploys from Git (GitHub)

1. Create a Vercel token (via the Vercel dashboard or `vercel token create "github-action"`).
2. In your GitHub repository, go to Settings → Secrets → Actions and add:
	- `VERCEL_TOKEN` — the token you created.
	- (optional) `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` to pin deployments to a specific Vercel project.
3. On push to `main`, the included GitHub Actions workflow at `.github/workflows/deploy-vercel.yml` will deploy to Vercel automatically.

Notes:

- The workflow uses the `amondnet/vercel-action` GitHub Action and requires `VERCEL_TOKEN` in repository secrets.
- If you prefer Vercel's native Git integration (recommended for most users), connect the repository in the Vercel dashboard and skip the Action.
