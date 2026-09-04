import { redirect } from "next/navigation";
import type { NextPageIntlayer } from "next-intlayer";

const LocaleHomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  redirect(`/${locale}/fleets`);
};

export default LocaleHomePage;
