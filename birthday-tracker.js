import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format, parseISO, differenceInDays, isBefore, addYears } from "date-fns";

const BirthdayTracker = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const checkReminders = () => {
      const today = new Date();
      birthdays.forEach(({ name, date }) => {
        let birthdayDate = parseISO(date);
        if (isBefore(birthdayDate, today)) {
          birthdayDate = addYears(birthdayDate, 1);
        }
        const daysUntil = differenceInDays(birthdayDate, today);
        if ([14, 7, 1].includes(daysUntil)) {
          alert(`Reminder: ${name}'s birthday is in ${daysUntil} days!`);
        }
      });
    };
    
    checkReminders();
    const interval = setInterval(checkReminders, 86400000); // Check once per day
    return () => clearInterval(interval);
  }, [birthdays]);

  const addBirthday = () => {
    if (name.trim() && date) {
      setBirthdays([...birthdays, { name: name.trim(), date }]);
      setName("");
      setDate("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Birthday Tracker</h2>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onClick={addBirthday} disabled={!name.trim() || !date}>Add</Button>
      </div>
      <div>
        {birthdays.map((b, index) => (
          <Card key={index} className="mb-2">
            <CardContent>
              {b.name} - {format(parseISO(b.date), "MMMM d")}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BirthdayTracker;
