
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Save, X } from "lucide-react";
import { modelsData } from "@/utils/mockData";

export function ModelPricing() {
  const [models, setModels] = useState(modelsData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    inputCost: 0,
    outputCost: 0,
    multiplier: 0
  });

  const handleToggleModel = (id: number) => {
    setModels(models.map(model => 
      model.id === id ? { ...model, enabled: !model.enabled } : model
    ));
  };

  const startEditing = (model: any) => {
    setEditingId(model.id);
    setEditForm({
      inputCost: model.inputCost,
      outputCost: model.outputCost,
      multiplier: model.multiplier
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveChanges = (id: number) => {
    setModels(models.map(model => 
      model.id === id ? { 
        ...model, 
        inputCost: editForm.inputCost,
        outputCost: editForm.outputCost,
        multiplier: editForm.multiplier,
        estimatedUSD: +(editForm.inputCost + editForm.outputCost).toFixed(4),
        pointBurn: +((editForm.inputCost + editForm.outputCost) * 1000 * editForm.multiplier).toFixed(1)
      } : model
    ));
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: parseFloat(value) || 0
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Model Pricing & Multipliers</h2>
        <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add New Model
        </Button>
      </div>
      
      <Card className="p-5 dashboard-card overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium">All Models</span>
          <div className="flex gap-2">
            <Input
              placeholder="Search models..."
              className="max-w-xs"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Input Cost (per 1K)</TableHead>
                <TableHead className="text-right">Output Cost (per 1K)</TableHead>
                <TableHead className="text-right">Est. USD</TableHead>
                <TableHead className="text-right">Multiplier</TableHead>
                <TableHead className="text-right">Point Burn (per 1K)</TableHead>
                <TableHead className="text-center">Enabled</TableHead>
                <TableHead className="text-right">Usage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  
                  {editingId === model.id ? (
                    <>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          name="inputCost"
                          value={editForm.inputCost}
                          onChange={handleInputChange}
                          className="h-8 w-20 ml-auto"
                          step="0.0001"
                          min="0"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          name="outputCost"
                          value={editForm.outputCost}
                          onChange={handleInputChange}
                          className="h-8 w-20 ml-auto"
                          step="0.0001"
                          min="0"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        ${((editForm.inputCost + editForm.outputCost) || 0).toFixed(4)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          name="multiplier"
                          value={editForm.multiplier}
                          onChange={handleInputChange}
                          className="h-8 w-20 ml-auto"
                          step="0.1"
                          min="0.1"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {((editForm.inputCost + editForm.outputCost) * 1000 * editForm.multiplier).toFixed(1)}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="text-right">${model.inputCost.toFixed(4)}</TableCell>
                      <TableCell className="text-right">${model.outputCost.toFixed(4)}</TableCell>
                      <TableCell className="text-right">${model.estimatedUSD.toFixed(4)}</TableCell>
                      <TableCell className="text-right">{model.multiplier}x</TableCell>
                      <TableCell className="text-right">{model.pointBurn}</TableCell>
                    </>
                  )}
                  
                  <TableCell className="text-center">
                    <Switch
                      checked={model.enabled}
                      onCheckedChange={() => handleToggleModel(model.id)}
                      className={model.enabled ? "bg-dashboard-success" : ""}
                    />
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span>{model.usage.toLocaleString()}</span>
                      <span className={`text-xs ${model.dailyChange >= 0 ? 'text-dashboard-success' : 'text-dashboard-danger'}`}>
                        {model.dailyChange >= 0 ? '+' : ''}{model.dailyChange}%
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    {editingId === model.id ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={cancelEditing}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => saveChanges(model.id)}
                          className="h-8 w-8 text-dashboard-success"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(model)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5 dashboard-card">
          <h3 className="font-medium text-base mb-4">Global Multiplier Settings</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Multiplier</label>
                <Input type="number" defaultValue={1.5} className="h-10" min={0.1} step={0.1} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Free Plan Limit</label>
                <Input type="number" defaultValue={2.0} className="h-10" min={0.1} step={0.1} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Abuse Protection Threshold</label>
              <Input type="number" defaultValue={5.0} className="h-10" min={1.0} step={0.5} />
              <p className="text-xs text-gray-500 mt-1">Models with usage spikes above this threshold will be automatically flagged</p>
            </div>
            <Button className="bg-dashboard-primary hover:bg-dashboard-primary/90 mt-2">
              Save Global Settings
            </Button>
          </div>
        </Card>

        <Card className="p-5 dashboard-card">
          <h3 className="font-medium text-base mb-4">Pricing Simulator</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Model</label>
                <select className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:border-dashboard-primary">
                  {models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Input Tokens</label>
                <Input type="number" defaultValue={1000} className="h-10" min={0} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Output Tokens</label>
                <Input type="number" defaultValue={500} className="h-10" min={0} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Multiplier</label>
                <Input type="number" defaultValue={1.5} className="h-10" min={0.1} step={0.1} />
              </div>
            </div>
            <Button className="w-full bg-dashboard-primary hover:bg-dashboard-primary/90">
              Calculate Cost
            </Button>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Raw USD Cost:</span>
                <span className="text-sm font-medium">$0.022</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Point Burn:</span>
                <span className="text-sm font-medium">33 points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-800">Effective Internal Cost:</span>
                <span className="text-sm font-semibold">$0.033</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
