# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
|last_name|string|null: false|
|first_name|string|null: false|
|last_name_kana|string|null: false|
|first_name_kana|string|null: false|
|birthday_year|integer|null: false|
|birthday_month|integer|null: false|
|birthday__day|integer|null: false|
|address_last_name|string|null: false|
|address_first_name|string|null: false|
|address_last_name_kana|string|null: false|
|address_first_name_kana|string|null: false|
|address_zip_code|integer|null: false|
|address_prefectures|string|null: false|
|address_municipality|string|null: false|
|address_number|integer|null: false|
|address_building_name|string|-----|
|address_phone_number|integer|-----|


### Association
- has_many :items
- has_many :cards
- has_many :likes
- has_many :comments
- has_one  :acount

## acountsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null, false, foreign_key: true|
|aicon_image|integer|-------|

### Association
- belongs_to :user

## itemsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|category_id|integer|null: false, foreign_key: true|
|brand_id|integer|foreign_key: true|
|name|string|null: false, add_index :items, :name|
|status|string|null: false, add_index :items, :status|
|size|string|null: false, add_index :items, :size|
|shipping_charges|string|null: false|
|delivery_method|string|null: false|
|shipping_area|string|null: false|
|days_to_ship|string|null: fasle|
|price|integer|null: false, add_index :items, :price|

### Association
- belongs_to :user
- belongs_to :category
- belongs_to :brand
- has_many   :likes
- has_many   :comment
- has_many   :images

##  imagesテーブル

|Column|Type|Options|
|------|----|-------|
|item_id|integer|null: false, foreign_key: true|
|image|string|null: false|

### Association

- belongs_to  :item

## categorysテーブル

|Column|Type|Options|
|------|----|-------|
|parent_id|integer|-----|
|name|string|null: false|

### Association

- has_many :items
- has_ancestry

## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|item_id|integer|null: false, foreign_key: true|
|text|text|null: false|

### Association

- belongs_to :user
- belongs_to :item

## likesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|item_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :user
- belongs_to :item

##  brandsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association

- has_many :items

## cardsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|payjp_id|string|null: false|

### Association

- belongs_to :user



/\A[ぁ-んァ-ン一-龥]/
/\A[ァ-ヶー－]+\z/
/\A[a-zA-Z0-9]+\z/
/\A\d{11}\z/
/\A\d{3}[-]\d{4}$|^\d{3}[-]\d{2}$|^\d{3}$|^\d{5}$|^\d{7}\z/
validates :password, format: { with: VALID_PASSWORD_REGEX }