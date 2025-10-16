export interface LastDonation {
    project: string;
    date: string;
    amount: string; 
}

export const lastsDonations: LastDonation[] = [
    {
        project: "Ayuda a niños con cáncer",
        date: "15-10-2025",
        amount: "150.000"
    },
    {
        project: "Reforestación urbana", 
        date: "14-10-2025",
        amount: "75.000"
    },
    {
        project: "Alimentos para ancianos",
        date: "13-10-2025",
        amount: "200.000"
    },
    {
        project: "Educación en zonas rurales",
        date: "12-10-2025", 
        amount: "300.000"
    },
    {
        project: "Rescate de animales",
        date: "11-10-2025",
        amount: "50.000"
    },
    {
        project: "Viviendas de emergencia",
        date: "10-10-2025",
        amount: "500.000"
    },
    {
        project: "Becas estudiantiles",
        date: "09-10-2025",
        amount: "125.000"
    },
    {
        project: "Equipamiento médico",
        date: "08-10-2025",
        amount: "1.000.000"
    }
];