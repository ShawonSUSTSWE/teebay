import cron from "node-cron";
import prisma from "../config/DB.js";
import { ProductStatus, TransactionType } from "@prisma/client";

//For Test, runs every 10 seconds
// const cronTestScheduleString = "*/10 * * * * *";

//Runs at 0:00 midnight
const cronScheduleString = "0 0 * * *";

cron.schedule(cronScheduleString, async () => {
  const now = new Date();
  console.log("Running daily cron to update product availability...");

  try {
    const expiredRentals = await prisma.transaction.findMany({
      where: {
        type: TransactionType.RENT,
        endDate: { lt: now },
      },
    });

    const productIds = expiredRentals.map((rental) => rental.productId);

    const updates = await prisma.product.updateMany({
      where: { id: { in: productIds }, status: ProductStatus.RENTED },
      data: { status: ProductStatus.AVAILABLE },
    });

    console.log(`Updated ${updates.count} product(s) to available.`);
  } catch (error) {
    console.error("Cron job error:", error);
  }
});
