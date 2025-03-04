import { Card } from "@/components/ui/card";
import { Heart, Brain, Apple, Sun } from "lucide-react";

const healthTips = [
  {
    icon: Heart,
    title: "Heart Health",
    tip: "Regular exercise and a balanced diet can significantly improve heart health and reduce cardiovascular risks.",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    tip: "Practice mindfulness and ensure 7-8 hours of quality sleep for better mental health and cognitive function.",
  },
  {
    icon: Apple,
    title: "Nutrition",
    tip: "Include a variety of colorful fruits and vegetables in your diet to get essential vitamins and antioxidants.",
  },
  {
    icon: Sun,
    title: "Daily Habits",
    tip: "Stay hydrated and maintain good posture throughout the day for overall well-being.",
  },
];

export default function HealthTips() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">Daily Health Tips</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Simple yet effective ways to maintain your health and well-being in your daily life.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthTips.map((tip, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <tip.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
              <p className="text-muted-foreground">{tip.tip}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
