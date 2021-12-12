module.exports = {
  root: false,
  env: {
    node: false,
  },
  
  //extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  extends: ["plugin:vue/vue3-essential", "@vue/prettier"],
  
  
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "off",
  },
  
};
