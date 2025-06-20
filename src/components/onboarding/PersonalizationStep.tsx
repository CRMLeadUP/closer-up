import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Target, TrendingUp, Users } from 'lucide-react';

const PersonalizationStep = () => {
  const { userPreferences, updatePreferences } = useOnboarding();

  const experienceLevels = [
    { id: 'iniciante', label: 'Iniciante', description: 'Começando agora', icon: Target },
    { id: 'intermediario', label: 'Intermediário', description: '1-3 anos', icon: TrendingUp },
    { id: 'avancado', label: 'Avançado', description: '3+ anos', icon: Users }
  ];

  const salesGoals = [
    { id: 'renda', label: 'Aumentar Renda', description: 'Foco em ganhos' },
    { id: 'tecnicas', label: 'Melhorar Técnicas', description: 'Aperfeiçoar habilidades' },
    { id: 'conversao', label: 'Aumentar Conversão', description: 'Fechar mais vendas' },
    { id: 'carreira', label: 'Crescer na Carreira', description: 'Evoluir profissionalmente' }
  ];

  return (
    <div className="space-y-6 animate-scale-in pb-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">
          Vamos personalizar sua jornada
        </h2>
        <p className="text-muted-foreground">
          Conte-nos sobre você para uma experiência única
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            Como podemos te chamar?
          </Label>
          <Input
            id="name"
            placeholder="Seu primeiro nome"
            value={userPreferences.name}
            onChange={(e) => updatePreferences({ name: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">
            Qual seu nível de experiência em vendas?
          </Label>
          <div className="grid gap-2 mt-2">
            {experienceLevels.map((level) => {
              const IconComponent = level.icon;
              return (
                <Card
                  key={level.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    userPreferences.experience === level.id
                      ? 'ring-2 ring-sales-primary bg-sales-primary/10'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => updatePreferences({ experience: level.id })}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-sales-primary" />
                      <div>
                        <h4 className="font-medium">{level.label}</h4>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">
            Qual seu principal objetivo?
          </Label>
          <div className="grid gap-2 mt-2">
            {salesGoals.map((goal) => (
              <Card
                key={goal.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  userPreferences.salesGoal === goal.id
                    ? 'ring-2 ring-sales-secondary bg-sales-secondary/10'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => updatePreferences({ salesGoal: goal.id })}
              >
                <CardContent className="p-3">
                  <div>
                    <h4 className="font-medium">{goal.label}</h4>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationStep;