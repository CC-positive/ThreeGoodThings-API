# ThreeGoodThings-API
![icon](https://user-images.githubusercontent.com/71970550/99811456-8d3c0680-2b88-11eb-9226-cc715a2bc9f8.png)

## Table of Contents
**[What is ThreeGoodThings](#what-is-threegoodthings)**<br>
**[What is ThreeGoodThingsAPI](#what-is-threegoodthingsapi)**<br>
**[HOW TO Install](#how-to-install)**<br>
**[HOW TO RUN](#how-to-run)**<br>
**[Remarks](#remarks)**<br>

## What is ThreeGoodThings
- ビジョン
  - 小さな幸せを分かち合う
  - ユーザが幸せを共有し合うことで、幸福度を高める
- ゴール
  - 日々３つの良いことを投稿できて、全体公開できる機能を実現する。

## What is ThreeGoodThingsAPI
本リポジトリはThreeGoodThings向けのAPIです。<br/>
API仕様は以下をご確認ください。<br/>
https://cc-positive.github.io/ThreeGoodThings-API/dist/

## HOW TO INSTALL
- Postgresqlをインストールしてください。
- config.jsonを各自の環境に合わせて修正してください。
  - username: Postgresqlへアクセスするときのユーザ名。例：postgres
  - password: Postgresqlへアクセスするときのパスワード。例：password
  - database : 利用するPostgresqlのdatabaseオブジェクト名。
  - host: APサーバからみた、DBサーバのホスト名。例：localhost
* yarnを実行して、必要なパッケージをインストールしてください。
* yarn setupを利用して、データベース環境のデータのセットアップを行ってください。

## HOW TO RUN
* コマンド実行（APサーバの8080ポートでHTTPリクエストを受け付けます）
  - yarn start

## Remarks
- このリポジトリは Code Chrysalis の生徒であるときに作成しました（This was created during my time as a student at Code Chrysalis）
