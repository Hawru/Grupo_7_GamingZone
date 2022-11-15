let DataTypes = require("sequelize").DataTypes;
let _invoice_details = require("./invoice_details");
let _invoices = require("./invoices");
let _plataforms = require("./plataforms");
let _product_comments = require("./product_comments");
let _product_images = require("./product_images");
let _product_plataform = require("./product_plataform");
let _product_requirement = require("./product_requirement");
let _product_score = require("./product_score");
let _product_version = require("./product_version");
let _products = require("./products");
let _requirement_types = require("./requirement_types");
let _sales = require("./sales");
let _score_types = require("./score_types");
let _user_types = require("./user_types");
let _users = require("./users");
let _version_types = require("./version_types");

function initModels(sequelize) {
  let invoice_details = _invoice_details(sequelize, DataTypes);
  let invoices = _invoices(sequelize, DataTypes);
  let plataforms = _plataforms(sequelize, DataTypes);
  let product_comments = _product_comments(sequelize, DataTypes);
  let product_images = _product_images(sequelize, DataTypes);
  let product_plataform = _product_plataform(sequelize, DataTypes);
  let product_requirement = _product_requirement(sequelize, DataTypes);
  let product_score = _product_score(sequelize, DataTypes);
  let product_version = _product_version(sequelize, DataTypes);
  let products = _products(sequelize, DataTypes);
  let requirement_types = _requirement_types(sequelize, DataTypes);
  let sales = _sales(sequelize, DataTypes);
  let score_types = _score_types(sequelize, DataTypes);
  let user_types = _user_types(sequelize, DataTypes);
  let users = _users(sequelize, DataTypes);
  let version_types = _version_types(sequelize, DataTypes);

  invoice_details.belongsTo(invoices, { as: "invoice", foreignKey: "invoice_id"});
  invoices.hasMany(invoice_details, { as: "invoice_details", foreignKey: "invoice_id"});
  product_plataform.belongsTo(plataforms, { as: "plataform_type", foreignKey: "plataform_type_id"});
  plataforms.hasMany(product_plataform, { as: "product_plataforms", foreignKey: "plataform_type_id"});
  product_comments.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_comments, { as: "product_comments", foreignKey: "product_id"});
  product_images.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_images, { as: "product_images", foreignKey: "product_id"});
  product_plataform.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_plataform, { as: "product_plataforms", foreignKey: "product_id"});
  product_requirement.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_requirement, { as: "product_requirements", foreignKey: "product_id"});
  product_score.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_score, { as: "product_scores", foreignKey: "product_id"});
  product_version.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_version, { as: "product_versions", foreignKey: "product_id"});
  sales.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(sales, { as: "sales", foreignKey: "product_id"});
  product_requirement.belongsTo(requirement_types, { as: "requirement", foreignKey: "requirement_id"});
  requirement_types.hasMany(product_requirement, { as: "product_requirements", foreignKey: "requirement_id"});
  invoice_details.belongsTo(sales, { as: "sale", foreignKey: "sale_id"});
  sales.hasMany(invoice_details, { as: "invoice_details", foreignKey: "sale_id"});
  product_score.belongsTo(score_types, { as: "score_type", foreignKey: "score_type_id"});
  score_types.hasMany(product_score, { as: "product_scores", foreignKey: "score_type_id"});
  users.belongsTo(user_types, { as: "user_type", foreignKey: "user_type_id"});
  user_types.hasMany(users, { as: "users", foreignKey: "user_type_id"});
  product_comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(product_comments, { as: "product_comments", foreignKey: "user_id"});
  sales.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(sales, { as: "sales", foreignKey: "user_id"});
  product_version.belongsTo(version_types, { as: "version", foreignKey: "version_id"});
  version_types.hasMany(product_version, { as: "product_versions", foreignKey: "version_id"});

  return {
    invoice_details,
    invoices,
    plataforms,
    product_comments,
    product_images,
    product_plataform,
    product_requirement,
    product_score,
    product_version,
    products,
    requirement_types,
    sales,
    score_types,
    user_types,
    users,
    version_types,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
