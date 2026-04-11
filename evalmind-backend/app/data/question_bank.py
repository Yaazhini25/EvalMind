QUESTION_BANK = {
    "beginner": [
        {
            "question_id": 1,
            "question_text": "What is an Operating System and what are its main functions?",
            "expected_answer": "An Operating System (OS) is system software that acts as an intermediary between the user and computer hardware. It manages hardware resources like CPU, memory, storage, and I/O devices. The main functions include: Process Management (creating, scheduling, and terminating processes), Memory Management (allocating and deallocating memory to processes), File System Management (organizing and controlling access to files), Device Management (handling hardware devices through drivers), and Security & Access Control (protecting the system from unauthorized access and ensuring data integrity)."
        },
        {
            "question_id": 2,
            "question_text": "What is a process and what is a process table?",
            "expected_answer": "A process is an instance of a program in execution. For example, a web browser running is a process and a terminal/shell is another process. The OS is responsible for managing all running processes, allocating CPU time, memory, and other resources to each. To keep track of all processes, the OS maintains a data structure called the Process Table. Inside this table, every process is listed along with the resources it is currently using and its current state (running, waiting, or ready)."
        },
        {
            "question_id": 3,
            "question_text": "What are the different states of a process?",
            "expected_answer": "A process can be in one of the following states: (1) New – The process is being created. (2) Ready – The process is waiting to be assigned to the CPU; it has all resources needed except the processor. (3) Running – The process is currently being executed by the CPU. Only one process can be in the running state at a time on a single-core system. (4) Waiting/Blocked – The process is waiting for some event to occur, such as I/O completion or user input. (5) Terminated – The process has finished execution. The OS moves processes between these states based on scheduling decisions and events."
        },
        {
            "question_id": 4,
            "question_text": "What is a thread and how is it different from a process?",
            "expected_answer": "A thread is the smallest unit of CPU execution within a process, sometimes called a lightweight process. Threads within the same process share the same memory space (code, data, and heap) but each has its own stack, registers, and program counter. A process, on the other hand, is an independent program with its own separate memory address space. Communication between threads is faster (via shared memory) whereas processes communicate via Inter-Process Communication (IPC), which is slower. Context switching between threads is also lighter than between processes. Example: A browser might use multiple threads — one for rendering, one for network requests, and one for handling user input."
        },
        {
            "question_id": 5,
            "question_text": "What is the kernel?",
            "expected_answer": "The kernel is the core component of an Operating System that directly manages the hardware and system resources. It acts as a bridge between applications running in user space and the hardware. The kernel handles critical tasks such as CPU scheduling, memory management, device management, and system calls. It operates in a privileged mode (kernel mode) where it has full access to all hardware. When a user application needs to interact with hardware, it makes a system call, which transfers control from user mode to kernel mode."
        },
        {
            "question_id": 6,
            "question_text": "What is virtual memory?",
            "expected_answer": "Virtual memory is a memory management technique that creates an illusion for processes that they have access to a large, contiguous block of memory, even if physical RAM is limited. The OS uses disk space (swap space) to extend RAM. Each process gets its own virtual address space, and the OS maps virtual addresses to physical addresses using a page table. This allows larger applications to run, provides process isolation (one process cannot access another's memory), and improves multitasking. The downside is that accessing disk is much slower than RAM, so excessive use of virtual memory leads to thrashing."
        },
        {
            "question_id": 7,
            "question_text": "What is a system call?",
            "expected_answer": "A system call is the programmatic way through which a user-level program requests a service from the OS kernel. Since user programs run in user mode (with restricted access), they cannot directly access hardware or kernel resources. System calls act as a controlled entry point into kernel mode. Common types of system calls include: Process control (fork, exec, exit), File management (open, read, write, close), Device management (ioctl), Information maintenance (getpid, time), and Communication (pipe, socket). Examples include read() and write() in Unix/Linux."
        },
        {
            "question_id": 8,
            "question_text": "What is the difference between multiprogramming and multitasking?",
            "expected_answer": "Multiprogramming is a technique where multiple programs are loaded into memory at the same time to maximize CPU utilization. When one program is waiting for I/O, the CPU switches to another program. The primary goal is to keep the CPU busy at all times. Multitasking (also called time-sharing) is an extension of multiprogramming where the CPU switches between multiple tasks so rapidly that each user or program gets the impression of dedicated CPU time. In multitasking, the CPU is time-sliced among processes using a scheduler, allowing interactive use by multiple users simultaneously."
        },
        {
            "question_id": 9,
            "question_text": "What is CPU scheduling and why is it important?",
            "expected_answer": "CPU scheduling is the process by which the OS decides which process in the ready queue gets to use the CPU next. It is important because at any given time, multiple processes may be ready to execute but there is only one CPU (in a single-core system). A good scheduling algorithm maximizes CPU utilization, ensures fairness among processes, minimizes waiting time and response time, and maximizes throughput. Common scheduling algorithms include FCFS (First-Come-First-Served), SJF (Shortest Job First), Round Robin, and Priority Scheduling."
        },
        {
            "question_id": 10,
            "question_text": "What is a deadlock?",
            "expected_answer": "A deadlock is a situation in which two or more processes are each waiting for a resource held by the other, causing all of them to be stuck indefinitely. For a deadlock to occur, all four of the following conditions (Coffman conditions) must hold simultaneously: (1) Mutual Exclusion – Only one process can hold a resource at a time. (2) Hold and Wait – A process holds at least one resource and is waiting for more. (3) No Preemption – Resources cannot be forcibly taken away from a process. (4) Circular Wait – A circular chain of processes exists where each is waiting for a resource held by the next. Deadlocks can be prevented by breaking any one of these conditions."
        },
        {
            "question_id": 11,
            "question_text": "What is paging in OS?",
            "expected_answer": "Paging is a memory management technique that allows processes to be stored in non-contiguous physical memory, eliminating the problem of external fragmentation. In paging, physical memory is divided into fixed-size blocks called frames, and logical memory (virtual memory of a process) is divided into blocks of the same size called pages. When a process is loaded, its pages are mapped to available frames anywhere in physical memory. The OS maintains a page table for each process that maps logical page numbers to physical frame numbers. Paging is widely used because it allows efficient memory utilization."
        },
        {
            "question_id": 12,
            "question_text": "What is fragmentation and what are its types?",
            "expected_answer": "Fragmentation refers to the condition where memory is wasted due to the way it is allocated and freed. There are two types: (1) Internal Fragmentation – Occurs when a process is allocated more memory than it actually needs. The unused portion inside the allocated block is wasted. This commonly occurs in fixed-size partitioning. (2) External Fragmentation – Occurs when there is enough total free memory to satisfy a request, but it is scattered in small non-contiguous blocks that cannot be used together. This commonly occurs in dynamic memory allocation. Compaction (moving all processes to one end) can solve external fragmentation but is costly."
        }
    ],
    "intermediate": [
        {
            "question_id": 1,
            "question_text": "Explain the different CPU scheduling algorithms with their advantages and disadvantages.",
            "expected_answer": "The major CPU scheduling algorithms are: (1) FCFS (First-Come-First-Served) – Processes are served in the order they arrive. Simple but suffers from the convoy effect where short jobs wait behind long ones. (2) SJF (Shortest Job First) – The process with the smallest burst time is executed next. Minimizes average waiting time but requires knowing execution time in advance; can cause starvation of longer jobs. (3) Round Robin – Each process gets a fixed time quantum (slice) in rotation. Fair and good for time-sharing but performance depends heavily on the quantum size. (4) Priority Scheduling – Processes are assigned priorities; the highest-priority process runs first. Can be preemptive or non-preemptive. May cause starvation, solved by aging. (5) Multilevel Queue – Processes are divided into multiple queues (e.g., foreground vs background), each using a different algorithm. (6) Multilevel Feedback Queue – Processes can move between queues based on behavior, making it adaptive and flexible."
        },
        {
            "question_id": 2,
            "question_text": "What is context switching and what happens during it?",
            "expected_answer": "Context switching is the process of saving the state of the currently running process and loading the state of the next process to be run, allowing the CPU to switch between processes. During a context switch: (1) The OS saves the current process's context (Program Counter, CPU registers, memory maps, open files, etc.) into its Process Control Block (PCB). (2) The scheduler selects the next process from the ready queue. (3) The OS restores the saved state of the new process from its PCB. (4) Execution resumes from where the new process left off. Context switching has overhead since no useful work is done during the switch. Threads have lighter context switches than full processes since they share the same address space."
        },
        {
            "question_id": 3,
            "question_text": "What is thrashing and how can it be prevented?",
            "expected_answer": "Thrashing is a severe performance degradation condition where the OS spends more time swapping pages between disk and RAM than actually executing processes. It occurs when a system has too many active processes and the combined working sets exceed available physical memory, causing a rapid succession of page faults. As the page fault rate increases, CPU utilization drops drastically. Prevention techniques include: (1) Reducing the degree of multiprogramming — run fewer processes simultaneously. (2) Using the Working Set Model — only keep the pages that a process actively uses in memory. (3) Page Fault Frequency (PFF) algorithm — monitor and control page fault rates per process. (4) Adding more physical RAM. (5) Using efficient page replacement algorithms like LRU (Least Recently Used)."
        },
        {
            "question_id": 4,
            "question_text": "What is demand paging and how does it work?",
            "expected_answer": "Demand paging is a technique where pages of a process are loaded into memory only when they are actually needed (on demand), rather than loading the entire process at once. How it works: (1) When a process starts, only a minimal set of pages (or none) are loaded. (2) When the CPU references a page that is not in physical memory, a page fault is triggered. (3) The OS handles the page fault by locating the required page on disk. (4) A free frame in memory is found; if no free frame exists, a page replacement algorithm selects a victim page to evict. (5) The required page is loaded into the free frame, and the page table is updated. (6) The instruction that caused the page fault is restarted. Demand paging reduces initial load time and saves memory by loading only needed pages."
        },
        {
            "question_id": 5,
            "question_text": "Explain the different page replacement algorithms.",
            "expected_answer": "Page replacement algorithms decide which page to evict from memory when a new page needs to be loaded but no free frames are available. (1) FIFO (First-In-First-Out) – The oldest page in memory is replaced. Simple but can suffer from Belady's anomaly (more frames lead to more page faults). (2) Optimal (OPT) – Replaces the page that will not be used for the longest time in the future. Gives the lowest page fault rate but is impossible to implement in practice since future references are unknown — used as a benchmark. (3) LRU (Least Recently Used) – Replaces the page that was used least recently. Good practical performance but requires hardware support or software overhead to track usage order. (4) Clock (Second Chance) – A circular queue with a reference bit; if a page's bit is 1, it gets a second chance (bit reset to 0); if 0, it is replaced. A practical approximation of LRU."
        },
        {
            "question_id": 6,
            "question_text": "What is Inter-Process Communication (IPC) and what are its mechanisms?",
            "expected_answer": "Inter-Process Communication (IPC) refers to the set of mechanisms that allow processes to communicate with each other and synchronize their actions. Processes may need to share data or coordinate work. Key IPC mechanisms include: (1) Pipes – One-directional data channel between related (parent-child) processes. Named pipes allow unrelated processes to communicate. (2) Message Queues – Processes send and receive messages via a queue managed by the OS. Allows asynchronous communication. (3) Shared Memory – Two or more processes map the same segment of memory into their address spaces. Fastest form of IPC but requires synchronization mechanisms to avoid race conditions. (4) Semaphores – Used for signaling and synchronization between processes. (5) Sockets – Enable communication between processes on different machines over a network. (6) Signals – Used to notify a process that a specific event has occurred."
        },
        {
            "question_id": 7,
            "question_text": "What are semaphores and how are they used?",
            "expected_answer": "A semaphore is an integer variable used for process synchronization to control access to shared resources in a concurrent system. It supports two atomic operations: (1) wait() (also called P or down) — decrements the semaphore value. If the value becomes negative, the calling process is blocked. (2) signal() (also called V or up) — increments the semaphore value. If there are blocked processes, one is unblocked. Types: (1) Binary Semaphore (Mutex) — takes values 0 or 1; used for mutual exclusion to ensure only one process accesses a critical section at a time. (2) Counting Semaphore — can have any non-negative integer value; used to manage a pool of resources (e.g., a pool of 5 database connections). Semaphores solve classic synchronization problems like the Producer-Consumer problem, Readers-Writers problem, and Dining Philosophers problem."
        },
        {
            "question_id": 8,
            "question_text": "What is the difference between preemptive and non-preemptive scheduling?",
            "expected_answer": "In preemptive scheduling, the CPU can be taken away from a currently running process before it completes its execution. This happens when a higher-priority process arrives or the time quantum expires (as in Round Robin). Preemptive scheduling ensures better responsiveness and is used in most modern multitasking operating systems. In non-preemptive scheduling, once a process gets the CPU, it holds it until it either finishes execution or voluntarily gives up the CPU (e.g., by waiting for I/O). FCFS and non-preemptive SJF are examples. Non-preemptive scheduling is simpler but can lead to poor response times if a long process occupies the CPU. Preemptive scheduling is better for interactive systems while non-preemptive suits batch systems."
        },
        {
            "question_id": 9,
            "question_text": "What is the difference between user-level threads and kernel-level threads?",
            "expected_answer": "User-level threads (ULT) are managed entirely by a user-space thread library without any kernel knowledge. The kernel sees the entire process as a single-threaded entity. ULTs are fast to create and switch since no system calls are needed, but if one thread blocks (e.g., on I/O), the entire process blocks. Kernel-level threads (KLT) are managed directly by the OS kernel. The kernel is aware of each individual thread and can schedule them independently. KLTs provide true concurrency on multi-core systems and if one thread blocks, others in the same process can still run. However, KLTs have higher overhead due to kernel involvement in every thread operation (creation, switching). Most modern systems use a hybrid model (M:N) combining both."
        },
        {
            "question_id": 10,
            "question_text": "Explain segmentation in memory management.",
            "expected_answer": "Segmentation is a memory management technique where a process's memory is divided into variable-sized segments based on the logical structure of the program, such as code, data, stack, and heap segments. Unlike paging (which uses fixed-size units), segmentation aligns with the programmer's view of memory. Each segment has a base address and a length, and the OS maintains a Segment Table that maps each segment to its physical memory location. Advantages: Supports modular programming, easy to share code/data between processes (e.g., shared library segment), and provides logical protection per segment. Disadvantage: External fragmentation occurs since segments are variable-sized. Many modern OSes combine segmentation with paging (segmented paging) to get benefits of both."
        },
        {
            "question_id": 11,
            "question_text": "What are the four necessary conditions for a deadlock (Coffman's conditions)?",
            "expected_answer": "For a deadlock to arise, all four of the following conditions must hold simultaneously: (1) Mutual Exclusion — At least one resource must be held in a non-shareable mode; only one process can use it at a time. (2) Hold and Wait — A process is currently holding at least one resource and is waiting to acquire additional resources held by other processes. (3) No Preemption — Resources cannot be forcibly taken away from a process; they must be voluntarily released. (4) Circular Wait — A set of processes {P1, P2, ..., Pn} exists such that P1 is waiting for a resource held by P2, P2 is waiting for one held by P3, and so on, with Pn waiting for one held by P1. Deadlock prevention works by ensuring at least one of these conditions can never hold."
        },
        {
            "question_id": 12,
            "question_text": "What is the difference between internal and external fragmentation?",
            "expected_answer": "Internal fragmentation occurs when memory is allocated to a process in fixed-size blocks and the process does not use all of the allocated memory. The unused space inside the allocated block is wasted and cannot be used by other processes. This is common in paging and fixed-partition allocation. For example, if a process needs 18 KB and is allocated a 20 KB page, 2 KB is wasted internally. External fragmentation occurs when there is sufficient total free memory to satisfy a request, but the free memory is scattered in small, non-contiguous chunks. No single chunk is large enough to accommodate the request. This is common in dynamic memory allocation and segmentation. Compaction (reorganizing memory to merge free spaces) can solve external fragmentation but is expensive in terms of CPU time."
        }
    ],
    "advanced": [
        {
            "question_id": 1,
            "question_text": "What is the Banker's Algorithm and how does it work?",
            "expected_answer": "The Banker's Algorithm is a deadlock avoidance algorithm developed by Dijkstra. It works by simulating resource allocation and checking whether the system will remain in a safe state after granting a resource request. A safe state is one where there exists a safe sequence — an ordering of processes such that each process can be satisfied using currently available resources plus resources held by processes earlier in the sequence. How it works: Each process must declare its maximum resource needs upfront. When a process requests resources, the algorithm tentatively grants the request and checks if the resulting state is safe. If safe, the request is granted; if not, the process must wait. It uses three key data structures: Available (free resources), Allocation (resources currently held by each process), and Need (remaining resources needed). While theoretically important, it is impractical in real systems because processes rarely know their maximum needs in advance."
        },
        {
            "question_id": 2,
            "question_text": "Explain the concept of virtual memory in depth, including TLB, page tables, and address translation.",
            "expected_answer": "Virtual memory abstracts physical memory by giving each process its own virtual address space. Address translation from virtual to physical is done by the Memory Management Unit (MMU) using a page table. The page table maps virtual page numbers (VPN) to physical frame numbers (PFN). For a 32-bit address space with 4 KB pages, the page table can have up to 1 million entries — too large for a flat structure. Solutions include multi-level page tables (e.g., two-level or four-level as in x86-64) and inverted page tables. Since page table lookups are slow (requiring memory accesses), the TLB (Translation Lookaside Buffer) is used — a small, fast hardware cache that stores recent VPN-to-PFN mappings. On a TLB hit, translation is fast; on a TLB miss, the OS walks the page table and loads the mapping into the TLB. Page table entries also contain bits for validity, dirty (modified), referenced, and protection. When a page is not in physical memory, a page fault occurs and the OS handles loading it from disk."
        },
        {
            "question_id": 3,
            "question_text": "What is the difference between a monolithic kernel and a microkernel? What are their trade-offs?",
            "expected_answer": "In a monolithic kernel, the entire OS — including device drivers, file system, networking, memory management, and process scheduling — runs in a single large block of code in kernel space (privileged mode). This provides high performance due to direct function calls between components, but a bug in any component can crash the entire system. Linux is a well-known example of a monolithic kernel (though modular). A microkernel moves most OS services (file system, device drivers, networking) out of the kernel into user-space servers, leaving only the bare minimum (IPC, basic scheduling, memory protection) in the kernel. This improves reliability and security — a crashed driver doesn't take down the whole OS — and makes the kernel easier to maintain and port. The downside is performance overhead because services communicate via message passing (IPC) instead of direct calls. QNX and MINIX are microkernel-based. Modern OSes often use hybrid approaches (Windows NT, macOS with XNU) that combine elements of both."
        },
        {
            "question_id": 4,
            "question_text": "Explain deadlock detection and recovery strategies.",
            "expected_answer": "Deadlock detection involves periodically checking whether the system is in a deadlock state. This is done using a Resource Allocation Graph (RAG) — if the graph has a cycle, a deadlock exists. For multiple instances of a resource type, a detection algorithm similar to the Banker's Algorithm is run to check if any unsafe circular wait exists. In practice, tools like thread dumps, jstack (Java), or OS kernel logs are used to analyze wait graphs. Recovery strategies after detection: (1) Process Termination — abort all deadlocked processes (expensive) or abort them one by one until the deadlock is broken. The choice of which process to terminate considers factors like process priority, time consumed, and resources held. (2) Resource Preemption — forcibly take resources from some processes and give them to others. This requires rollback — reverting the preempted process to a safe state (checkpoint). The same process should not always be the victim (starvation prevention). (3) System Restart — in extreme cases, the system is restarted, losing all progress."
        },
        {
            "question_id": 5,
            "question_text": "What is the Critical Section Problem and what are the requirements for a valid solution?",
            "expected_answer": "The Critical Section Problem arises in concurrent systems where multiple processes share common resources. A critical section is a segment of code that accesses shared resources and must not be executed by more than one process simultaneously. A valid solution to the critical section problem must satisfy three requirements: (1) Mutual Exclusion — only one process can be executing in its critical section at any given time. (2) Progress — if no process is in its critical section and some processes want to enter, the decision on who enters next cannot be postponed indefinitely; only processes not in their remainder sections participate in the decision. (3) Bounded Waiting — there must be a bound on how many times other processes can enter their critical sections after a process has requested to enter its own — preventing starvation. Solutions include Peterson's Algorithm (software), hardware instructions like test-and-set or compare-and-swap, and higher-level constructs like semaphores, mutexes, and monitors."
        },
        {
            "question_id": 6,
            "question_text": "Explain the concept of RAID and describe its different levels.",
            "expected_answer": "RAID (Redundant Array of Independent Disks) is a data storage virtualization technology that combines multiple physical disk drives into one logical unit to improve performance, redundancy, or both. Key RAID levels: (1) RAID 0 (Striping) — Data is split across multiple disks for maximum performance and capacity. No redundancy; a single disk failure causes total data loss. (2) RAID 1 (Mirroring) — Data is duplicated on two or more disks. Full redundancy but storage efficiency is 50%. Good for critical data. (3) RAID 5 (Striping with Distributed Parity) — Data and parity information are distributed across at least 3 disks. Can tolerate one disk failure. Good balance of performance, capacity, and redundancy. (4) RAID 6 — Like RAID 5 but with double parity, allowing two simultaneous disk failures. (5) RAID 10 (RAID 1+0) — Combines mirroring and striping; offers high performance and high fault tolerance but requires at least 4 disks. Choice of RAID level depends on the trade-off between cost, performance, and fault tolerance requirements."
        },
        {
            "question_id": 7,
            "question_text": "What is a race condition and how can it be prevented?",
            "expected_answer": "A race condition is a situation in concurrent programming where the outcome of a computation depends on the relative timing or interleaving of multiple threads or processes accessing shared data. If the final result changes based on which process runs first, the program has a race condition. Example: Two threads both read a counter value of 5, each increments it, and both write back 6 — the result should have been 7. Race conditions are especially dangerous because they are non-deterministic and hard to reproduce. Prevention techniques: (1) Mutual Exclusion — use synchronization primitives like mutexes, locks, or semaphores to ensure only one thread accesses the critical section at a time. (2) Atomic Operations — use hardware-supported atomic instructions (test-and-set, compare-and-swap) that execute without interruption. (3) Immutable Data — design data structures that are read-only once created, eliminating shared mutable state. (4) Message Passing — instead of sharing memory, processes communicate by passing messages, avoiding shared state entirely."
        },
        {
            "question_id": 8,
            "question_text": "What is disk scheduling and explain the SCAN and C-SCAN algorithms?",
            "expected_answer": "Disk scheduling is the method the OS uses to determine the order in which disk I/O requests are processed to minimize seek time (the time for the disk head to move to the required track). SCAN Algorithm (Elevator Algorithm): The disk arm starts at one end and moves toward the other end, servicing all requests along the way. When it reaches the other end, it reverses direction and services requests on the way back. This is similar to an elevator and provides a more uniform wait time than FCFS or SSTF (Shortest Seek Time First). C-SCAN (Circular SCAN): An improvement over SCAN where the disk head moves in only one direction (say, from track 0 to the maximum). When it reaches the end, it immediately returns to the beginning without servicing requests on the return trip. This provides a more uniform waiting time distribution compared to SCAN because processes at the beginning of the disk do not have to wait for the head to travel to the far end and come all the way back. C-SCAN treats the disk as a circular list of tracks."
        },
        {
            "question_id": 9,
            "question_text": "What is the Producer-Consumer problem and how is it solved using semaphores?",
            "expected_answer": "The Producer-Consumer problem is a classic synchronization problem involving two types of processes sharing a fixed-size buffer: producers that generate and insert data into the buffer, and consumers that remove and use data from the buffer. The challenges are: (1) A producer must not insert into a full buffer. (2) A consumer must not remove from an empty buffer. (3) Both must not access the buffer simultaneously (mutual exclusion). Solution using semaphores: Three semaphores are used — (a) mutex (binary, initialized to 1) to ensure mutual exclusion when accessing the buffer; (b) empty (counting, initialized to buffer size) to count empty slots; (c) full (counting, initialized to 0) to count filled slots. Producer: calls wait(empty) to check for space, then wait(mutex) to lock, inserts item, calls signal(mutex) to unlock, then signal(full). Consumer: calls wait(full) to check for items, then wait(mutex), removes item, signal(mutex), then signal(empty). This ensures correct synchronization without deadlock."
        },
        {
            "question_id": 10,
            "question_text": "What is process synchronization and explain monitors as a synchronization construct.",
            "expected_answer": "Process synchronization is the coordination of concurrent processes to ensure correct ordering and mutually exclusive access to shared resources, preventing race conditions and inconsistencies. A monitor is a high-level synchronization construct that encapsulates shared data, procedures that operate on that data, and synchronization logic all within a single module. Key properties of monitors: (1) Only one process can be active inside the monitor at a time — mutual exclusion is automatically enforced. (2) Condition Variables are used for process coordination inside a monitor. A condition variable supports two operations: wait() — suspends the calling process and releases the monitor lock, and signal() — wakes up one waiting process. Monitors are safer and easier to use than semaphores because the synchronization logic is built into the monitor structure rather than being scattered across the program code. Java's synchronized keyword and Python's threading.Condition are implementations based on the monitor concept."
        },
        {
            "question_id": 11,
            "question_text": "What is a real-time operating system (RTOS) and how does its scheduling differ from a general-purpose OS?",
            "expected_answer": "A Real-Time Operating System (RTOS) is an OS designed to process data and events within strict, predictable time constraints (deadlines). Missing a deadline in an RTOS can lead to system failure, which is unacceptable in domains like medical devices, aircraft control, industrial automation, and automotive systems. Types: (1) Hard RTOS — deadlines are absolute; missing one is catastrophic (e.g., anti-lock braking systems). (2) Soft RTOS — occasional deadline misses are tolerable but degrade performance (e.g., video streaming). Scheduling differences from general-purpose OS: (1) RTOS uses priority-based preemptive scheduling (e.g., Rate Monotonic Scheduling — higher frequency tasks get higher priority) to guarantee deadlines. (2) Context switch times and interrupt latency must be deterministic and minimal. (3) Resource management must be predictable — dynamic memory allocation is often avoided in hard RTOS. (4) RTOS schedulers are optimized for worst-case execution time rather than average performance, unlike general OS schedulers (like Linux's CFS) which optimize for throughput and fairness."
        }
    ]
}
