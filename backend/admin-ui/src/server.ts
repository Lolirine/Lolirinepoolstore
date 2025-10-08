import path from "node:path";
const adminDir = path.join(__dirname, "../public/admin");
app.use("/admin", express.static(adminDir));
app.get("/admin/*", (_req, res) => res.sendFile(path.join(adminDir, "index.html")));

