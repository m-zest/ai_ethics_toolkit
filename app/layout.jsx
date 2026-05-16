import './globals.css';

export const metadata = {
  title: 'Ethics Toolkit — Put Values Into Action',
  description:
    'An interactive ethics framework for AI governance, product reviews, and team workshops. Adapted from the Stanford McCoy Family Center Ethics Toolkit.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
