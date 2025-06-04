import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const staffData = [
  { name: "Natalie", specialties: ["Eyelash", "Nail", "Waxing"] },
  { name: "Leyna", specialties: ["Wax", "Hair", "Facial", "Massage", "Eyelash"] },
  { name: "Tracy", specialties: ["Nail", "Hair", "Wax"] },
  { name: "Vicky", specialties: ["Nail"] },
  { name: "Kim", specialties: ["Nail"] },
  { name: "Ivy", specialties: ["Hair"] },
  { name: "Janet", specialties: ["Facial", "Microblading", "Hair"] },
  { name: "Lee", specialties: ["Nail", "Pedicure"] },
  { name: "Ava", specialties: ["Hair", "Waxing"] },
  { name: "Tiffany", specialties: ["Nail"] },
];

export default function BookingApp() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());

  const services = ["Nail", "Hair", "Facial", "Massage", "Microblading", "Eyelash", "Waxing"];
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const min = i % 2 === 0 ? "00" : "30";
    return `${hour}:` + min;
  });

  const handleServiceChange = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const filteredStaff = staffData.filter((s) =>
    selectedServices.some((svc) => s.specialties.includes(svc))
  );

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Great Nails & Hair</h1>
      <p className="text-sm">440 Great Mall Dr Milpitas, Entrance #5</p>

      {step === 1 && (
        <Card>
          <CardContent className="space-y-2 pt-4">
            <h2 className="font-semibold">What type of service do you want?</h2>
            <p className="text-xs text-muted">You can select multiple options</p>
            <div className="grid grid-cols-2 gap-2">
              {services.map((s) => (
                <label key={s} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedServices.includes(s)}
                    onCheckedChange={() => handleServiceChange(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
            <Button onClick={() => setStep(2)}>OK</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="space-y-2 pt-4">
            <h2 className="font-semibold">Choose a time slot</h2>
            <Calendar mode="single" selected={date} onSelect={setDate} />
            <div className="grid grid-cols-3 gap-2">
              {times.map((time, i) => (
                <Button
                  key={i}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
            <Button onClick={() => setStep(3)}>OK</Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="space-y-2 pt-4">
            <h2 className="font-semibold">Select Staff</h2>
            {filteredStaff.length === 0 && <p>No staff match selected services.</p>}
            {filteredStaff.map((staff, idx) => (
              <Button
                key={idx}
                variant={selectedStaff === staff.name ? "default" : "outline"}
                onClick={() => setSelectedStaff(staff.name)}
              >
                {staff.name} — {staff.specialties.join(", ")}
              </Button>
            ))}
            <Button onClick={() => setStep(4)}>Confirm</Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardContent className="space-y-4 pt-4">
            <h2 className="font-semibold">Enter your phone number</h2>
            <Input
              placeholder="(xxx) xxx-xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button onClick={() => setStep(5)}>Submit</Button>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardContent className="space-y-4 pt-4">
            <h2 className="text-lg font-semibold">Thank you for booking!</h2>
            <p>
              Appointment on {format(date, "PPPP")} at {selectedTime} with {selectedStaff}.
              We will text you at {phone} with a reminder.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
