# receipt-bank-db

Prototyping of Receipt Bank DB and API

## How to prepare

Install libraries.

```bash
cd receipt-bank-db/
npm install
```

Set IP addresses which are allowed to access API Gateway in config/.config.{stage}.yml

```yml
ALLOW_IP_LIST:
  - "<IP Address1>"
  - "<IP Address2>"
```

## How to deploy

Default values are

- stage: dev
- region: ap-northeast-1

```bash
npx serverless deploy -v --stage [stage name] --region [region name]
```

## How to destroy

```bash
npx serverless remove -v --stage [stage name] --region [region name]
```

## How to test

When try to request API, do as following.

API endpoint comes from deployment result of API Gateway.

```bash
curl -i -H "Content-Type: application/json" "[API endpoint]"
```

Run linter.

```bash
npm run lint
```
