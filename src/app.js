const express = require("express");
const app = express();
app.use(express.json())

// TODO: Follow instructions in the checkpoint to implement ths API.

const usersRouter = require("./users/users.router");
const pastesRouter = require("./pastes/pastes.router");

app.use("/users", usersRouter);
app.use("/pastes", pastesRouter);

/*
//order is important, put this before the all pastes route
app.use("/pastes/:pasteId", (req, res, next) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));
  console.log('foundPaste', foundPaste);

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    next({ 
      status: 404,
      message: `Paste id not found: ${pasteId}`
    });
  }
});
*/

/*
app.get("/pastes", (req, res) => {
  res.json({ data: pastes });
});
*/
/*
// New middleware function to validate the request body
function bodyHasTextProperty(req, res, next) {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next(); // Call `next()` without an error message if the result exists
  }
  next({
    status: 400,
    message: "A 'text' property is required."
  });
}

// Variable to hold the next ID
// Because some IDs may already be used, find the largest assigned ID
let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post(
  "/pastes",
  bodyHasTextProperty, // Add validation middleware function
  (req, res) => {
    // Route handler no longer has validation code.
    const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body;
    const newPaste = {
      id: ++lastPasteId, // Increment last id then assign as the current ID
      name,
      syntax,
      exposure,
      expiration,
      text,
      user_id,
    };
    pastes.push(newPaste);
    res.status(201).json({ data: newPaste });
  }
);
*/
/*
app.post("/pastes", (req, res, next) => {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body;
  if (text) {
    const newPaste = {
      id: ++lastPasteId, // Increment last ID, then assign as the current ID
      name,
      syntax,
      exposure,
      expiration,
      text,
      user_id,
    };
    pastes.push(newPaste); //pushes data to the list
    res.status(201).json({ data: newPaste }); //responds to client
  } else {
    res.sendStatus(400);
  }
});
*/


// Not found handler
app.use((request, response, next) => {
  next({
      status: 404,
      message: `Not found: ${request.originalUrl}`
  });
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
});

module.exports = app;
