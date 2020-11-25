module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        type: Sequelize.UUID,
      },
      tgtId: {
        type: Sequelize.UUID,
        references: { model: 'tgts', key: 'id' }, // 外部キー
        onUpdate: 'cascade', // （任意）連動して自動更新する場合
        onDelete: 'cascade', // （任意）連動して自動削除する場合
      },
      userId: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' }, // 外部キー
        onUpdate: 'cascade', // （任意）連動して自動更新する場合
        onDelete: 'cascade', // （任意）連動して自動削除する場合
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('likes');
  },
};
