const Tech = require("../models/Tech");
const User = require("../models/User");

module.exports = {
  async index(req, res) {},

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(400).json({ error: "usuario não foi encontrado." });

    const [tech] = await Tech.findOrCreate({
      where: { name }
    });

    await user.addTech(tech);
    return res.json(tech);
  }
};