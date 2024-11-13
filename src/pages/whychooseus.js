import React from 'react';

const WhyChooseUs = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Why Choose Us</h2>
      <p style={styles.subHeading}>
        Enjoy a seamless car rental experience with top-tier service and a diverse fleet.
      </p>
      <div style={styles.gridContainer}>
        <div style={styles.card}>
          <div style={styles.icon}>
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-1V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h1v2h2v-2h10v2h2v-2h1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-13-2h10v2H7V4zm13 12H4V8h16v8zm-9-4H5v2h6v-2zm3 0h6v2h-6v-2z"/>
            </svg>
          </div>
          <h3 style={styles.title}>Extensive Vehicle Range</h3>
          <p style={styles.description}>
            From city cars to spacious SUVs, we have the perfect vehicle to fit your needs.
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 16.52 2 11 6.48 1 12 1zm1 14h-2v2h2v-2zm0-10h-2v8h2V5z"/>
            </svg>
          </div>
          <h3 style={styles.title}>Affordable Rates</h3>
          <p style={styles.description}>
            Get the best value with transparent pricing and no hidden fees.
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 13.22V4H4v9.22C2.84 13.69 2 14.77 2 16v2c0 1.1.9 2 2 2h1v2h2v-2h10v2h2v-2h1c1.1 0 2-.9 2-2v-2c0-1.23-.84-2.31-2-2.78zM20 4h-4V2h-8v2H4v9h16V4z"/>
            </svg>
          </div>
          <h3 style={styles.title}>Effortless Reservations</h3>
          <p style={styles.description}>
            Book your vehicle in just a few clicks with our simple reservation system.
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <h3 style={styles.title}>Trusted & Reliable</h3>
          <p style={styles.description}>
            With years of experience, we ensure a hassle-free, reliable service.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '50px 30px',  // Increased padding for larger section
    background: '#f5f5f5', 
    color: '#263238', 
    textAlign: 'center',
  },
  heading: {
    fontSize: '42px',  // Larger heading font size
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: '25px',  // Increased margin for spacing
  },
  subHeading: {
    fontSize: '20px',  // Slightly larger subheading font size
    color: '#607D8B',
    marginBottom: '45px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Reduced min-width for cards
    gap: '45px',  // Increased gap between cards
    justifyContent: 'center',
    maxWidth: '1200px',  // Limit the maximum width of the grid container
    margin: '0 auto',  // Center the grid container horizontally
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '15px',  // Slightly larger border radius
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',  // Deeper shadow effect
    padding: '30px 20px',  // Reduced padding for smaller cards
    transition: 'transform 0.3s ease',
    textAlign: 'center',
  },
  icon: {
    fontSize: '45px',  // Larger icon size
    color: '#81D4FA',
    marginBottom: '25px',
  },
  title: {
    fontSize: '24px',  // Increased title font size
    fontWeight: '600',
    color: '#263238',
    marginBottom: '12px',
  },
  description: {
    fontSize: '18px',  // Larger description font size
    color: '#607D8B',
    lineHeight: '1.6',
  },
};

export default WhyChooseUs;
