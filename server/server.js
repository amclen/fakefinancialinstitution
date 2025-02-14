require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express")
const uuid = require("uuid").v4;
const { Sequelize } = require("sequelize");
const { User, Account, Transfer, sequelize } = require("./repository/models");
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 9000

// Route: pretend authentication
app.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await User.findAll({
      where: {
        email: email,
      }
    });

    const user = users[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password != password) {
      return res.sendStatus(500);
    }

    return res.status(200).json({ userId: user.userId, firstName: user.firstName, lastName: user.lastName });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Route: Create a new user
app.post('/user', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const userId = uuid();

    const user = await User.create({ userId, email, password, firstName, lastName });
    console.log("user", user)
    const userResponse = { ...user.dataValues, password: undefined }
    return res.status(201).json(userResponse);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Route: Create a new account
app.post('/user/:userId/account', async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, displayName } = req.body;

    const account = await Account.create({ userId, balance: amount, displayName });
    return res.status(201).json(account);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Route: Get all accounts for a user
app.get('/user/:userId/accounts', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the customer by userId
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all accounts associated with the user
    const accounts = await Account.findAll({
      where: { userId }
    });

    return res.status(200).json(accounts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Route: Transfer money between accounts
app.post('/accounts/:fromAccountId/transfer', async (req, res) => {
  try {
    const { fromAccountId } = req.params;
    const { toAccountId, amount } = req.body;
    console.log("body", req.body);
    console.log("fromAccountId", fromAccountId);
    console.log("toAccountId", toAccountId);

    const fromAccount = await Account.findByPk(fromAccountId);
    const toAccount = await Account.findByPk(toAccountId);

    if (!fromAccount || !toAccount) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (fromAccount.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const t = await sequelize.transaction();

    const transferId = uuid();
    try {
      // Perform the transfer
      fromAccount.balance -= amount;
      toAccount.balance += amount;

      await fromAccount.save({ transaction: t });
      await toAccount.save({ transaction: t });

      await Transfer.create({
        transferId,
        amount,
        fromAccountId,
        toAccountId
      }, { transaction: t });

      // If the execution reaches this line, no errors were thrown.
      // We commit the transfer transaction.
      await t.commit();
    } catch (error) {
      // rollback the transfer transaction.
      await t.rollback();
      console.log("rolling back!")
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ transferId, amount, fromAccountId, toAccountId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Route: Get account balance
app.get('/accounts/:accountId/balance', async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findByPk(accountId);

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    return res.status(200).json({ balance: account.balance });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Route: Get transfer history for an account
app.get('/accounts/:accountId/transfers', async (req, res) => {
  try {
    const { accountId } = req.params;
    console.log('accountId', accountId)
    const transfers = await Transfer.findAll({
      where: {
        [Sequelize.Op.or]: [
          { fromAccountId: accountId },
          { toAccountId: accountId }
        ]
      }
    });

    return res.status(200).json(transfers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
