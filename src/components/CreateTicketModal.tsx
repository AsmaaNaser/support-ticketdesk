import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addTicket } from '../features/tickets/ticketsThunks';
import type { TicketPriority } from '../types';

function CreateTicketModal() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [assigneeId, setAssigneeId] = useState('');

    const titleError =
        title.trim().length < 5 || title.trim().length > 80
            ? 'Title must be between 5 and 80 characters'
            : '';

    const descriptionError =
        description.trim() === ''
            ? 'Description is required'
            : '';

    const priorityError =
        priority === ''
            ? 'Priority is required'
            : '';

    const isValid =
        !titleError &&
        !descriptionError &&
        !priorityError;

    const dispatch = useAppDispatch();

    const createStatus = useAppSelector(
        (state) => state.tickets.createStatus
    );

    // const createError = useAppSelector(
    //     (state) => state.tickets.createError
    // );

    const isSaving = createStatus === 'pending';


    const handleCreate = async () => {
        if (!isValid || isSaving) return;

        const result = await dispatch(
            addTicket({
                title: title.trim(),
                description: description.trim(),
                priority: priority as TicketPriority,
                assigneeId: assigneeId || null,
            })
        );

        if (addTicket.fulfilled.match(result)) {
            setTitle('');
            setDescription('');
            setPriority('');
            setAssigneeId('');

        }
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setPriority('');
        setAssigneeId('');
    };

    return (
        <div className="create-ticket-panel">

            <div className="create-ticket-header">
                <h2>Create New Ticket</h2>

                {/* <button type="button" className="close-modal-btn">
                    ×
                </button> */}
            </div>

            <form className="create-ticket-form">

                <div className="form-group">
                    <label htmlFor="ticket-title">
                        Title <span className="required">*</span>
                    </label>
                    {titleError && (
                        <span className="field-error">
                            {titleError}
                        </span>
                    )}

                    <input
                        id="ticket-title"
                        type="text"
                        placeholder="Enter a short, clear title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={titleError ? 'input-error' : ''}
                    />
                </div>

                <div className="form-group">

                    <label htmlFor="ticket-description">
                        Description <span className="required">*</span>
                    </label>
                    {descriptionError && (
                        <span className="field-error">
                            {descriptionError}
                        </span>
                    )}

                    <textarea
                        id="ticket-description"
                        placeholder="Provide detailed information..."
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={descriptionError ? 'input-error' : ''}
                    />
                </div>

                <div className="form-group">

                    <label htmlFor="ticket-priority">
                        Priority <span className="required">*</span>
                    </label>
                    {priorityError && (
                        <span className="field-error">
                            {priorityError}
                        </span>
                    )}
                    <select id="ticket-priority" defaultValue="" value={priority} onChange={(e) => setPriority(e.target.value)}
                        className={priorityError ? 'input-error' : ''}>

                        <option value="" disabled>
                            Select priority
                        </option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="ticket-assignee">
                        Assign to <span className="optional">(optional)</span>
                    </label>

                    <select id="ticket-assignee" defaultValue="" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
                        <option value="">Select an agent</option>
                        <option value="a1">Mona Adel</option>
                        <option value="a2">Karim Fathy</option>
                        <option value="a3">Salma Nabil</option>
                        <option value="a4">Youssef Hany</option>
                    </select>
                </div>

                <div className="create-ticket-actions">
                    <button type="button" className="cancel-btn" onClick={handleCancel}>
                        Cancel
                    </button>

                    <button type="button" className="create-btn" disabled={!isValid} onClick={handleCreate}>
                        {isSaving ? 'Creating...' : 'Create Ticket'}
                    </button>
                </div>

            </form>
        </div>
    );
}

export default CreateTicketModal;