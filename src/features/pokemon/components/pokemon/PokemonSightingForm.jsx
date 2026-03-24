import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { useCreateSighting } from '../../hooks/useSightings';
import { sightingSchema } from '../../schemas/sightingSchema';

function FieldError({ error }) {
  if (!error) return null;
  return <small className="text-red-500 text-xs mt-0.5">{error.message}</small>;
}

function PokemonSightingForm({ pokemonName, onSightingAdded }) {
  const { mutate, isPending } = useCreateSighting();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: zodResolver(sightingSchema),
  });

  const onSubmit = (data) => {
    mutate(
      { ...data, date: data.date.toISOString().split('T')[0], pokemon: pokemonName },
      {
        onSuccess: (response) => {
          onSightingAdded({ ...data, date: data.date.toISOString().split('T')[0], id: response.id });
          reset();
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-md p-8 flex flex-col gap-6">

      <div>
        <h2 className="font-semibold text-pokedex-text flex items-center gap-2 text-lg">
            <i className="pi pi-map-marker text-pokedex-accent"/>
            Report a Sighting
        </h2>
        <p className="text-sm text-pokedex-text/50 mt-0.5">
          Spotted a <span className="capitalize font-medium text-pokedex-accent">{pokemonName}</span>? Let other trainers know!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-row p-inputgroup">
            <span className="p-inputgroup-addon bg-pokedex-accent">
                <i className="pi pi-user text-white"></i>
            </span>
            <FloatLabel>
              <InputText
                id="trainerName"
                {...register('trainerName')}
                className={`w-full bg-pokedex-bg border border-pokedex-accent ${errors.trainerName ? 'p-invalid' : ''}`}
              />
              <label htmlFor="trainerName">Trainer Name</label>
            </FloatLabel>
            <FieldError error={errors.trainerName} />
          </div>

          <div className="flex flex-row p-inputgroup">
            <span className="p-inputgroup-addon bg-pokedex-accent">
                <i className="pi pi-map text-white"></i>   
            </span>
            <FloatLabel>
              <InputText
                id="location"
                {...register('location')}
                className={`w-full bg-pokedex-bg border-pokedex-accent ${errors.location ? 'p-invalid' : ''}`}
              />
              <label htmlFor="location">Location</label>
            </FloatLabel>
            <FieldError error={errors.location} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <FloatLabel>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Calendar
                  id="date"
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  iconPos="left"
                  showIcon
                  maxDate={new Date()}
                  dateFormat="dd/mm/yy"
                  className={`w-full  ${errors.date ? 'p-invalid' : ''}`}
                  inputClassName="bg-pokedex-bg w-full pl-10 border-pokedex-accent"
                />
              )}
            />
            <label htmlFor="date" className='pl-12'>Date Spotted</label>
          </FloatLabel>
          <FieldError error={errors.date} />
        </div>

        <div className="flex flex-col gap-1">
          <FloatLabel>
            <InputTextarea
              id="description"
              {...register('description')}
              rows={4}
              className={`w-full bg-pokedex-bg border-pokedex-accent ${errors.description ? 'p-invalid' : ''}`}
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>
          <FieldError error={errors.description} />
        </div>

        <Button
          type="submit"
          label={isPending ? 'Submitting...' : 'Submit Sighting'}
          icon={isPending ? 'pi pi-spin pi-spinner' : 'pi pi-send'}
          disabled={isPending}
          className="w-full bg-pokedex-accent border-pokedex-accent hover:bg-pokedex-hover"
        />

      </form>
    </div>
  );
}

export default PokemonSightingForm;