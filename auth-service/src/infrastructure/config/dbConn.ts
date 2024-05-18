import { prisma } from "../dependencies";

(async () => {
  try {
    await prisma.$connect();
    console.log("Successful connection to the database");
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();
